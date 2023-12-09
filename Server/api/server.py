# =============================================================================
#                                DEPENDENCIES
# =============================================================================
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
)
from dotenv import load_dotenv
import pymongo
import os
import random
from datetime import timedelta
from bson import ObjectId  # Import ObjectId from bson module
from flask_socketio import SocketIO, emit
from ultralytics import YOLO
from pathlib import Path
import cv2
import time
import math

# =============================================================================
#                                CONFIGURATION
# =============================================================================
# Load environment variables from the .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS) for local development
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Configure MongoDB connection
MONGO_URI = os.getenv("MONGODB_URI")
client = pymongo.MongoClient(MONGO_URI)
db = client["users"]

# Configure JSON Web Token (JWT) for user authentication
app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")
jwt = JWTManager(app)

socketio = SocketIO(app, cors_allowed_origins="*")


@socketio.on("connect")
def handle_connect():
    emit("status", {"message": "Analysis started"})


def send_progress(progress):
    socketio.emit("progress", {"message": progress})


def send_results(results):
    socketio.emit("results", {"data": results})


class_names = ["crash"]


# =============================================================================
#                                USER MODEL
# =============================================================================
class User:
    def __init__(
        self,
        email,
        password,
        notification_channel,
        avatar_bg,
        avatar_color,
        avatar_id,
        upload_video_list=None,
    ):
        self.email = email
        self.password = password
        self.notification_channel = notification_channel
        self.avatar_bg = avatar_bg
        self.avatar_color = avatar_color
        self.avatar_id = avatar_id
        self.upload_video_list = upload_video_list or []


# =============================================================================
#                                UTILITY FUNCTIONS
# =============================================================================
def generate_random_color():
    """Generate a random hexadecimal color code."""
    letters = "0123456789ABCDEF"
    color = "#"
    for _ in range(6):
        color += random.choice(letters)
    return color


def generate_random_id():
    """Generate a random integer ID."""
    return random.randint(0, 30)


# =============================================================================
#                                ROUTES
# =============================================================================
@app.route("/", methods=["GET"])
def home():
    """Return a simple status message to indicate the server is running."""
    return {"status": "running"}


@app.route("/register", methods=["POST"])
def register():
    """Register a new user."""
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    try:
        # Check if the email already exists
        existing_user = db.users.find_one({"email": email})
        if existing_user:
            return jsonify({"message": "Email already exists"}), 409

        # Generate random values for avatar background, color, and ID
        avatar_bg = "#fff"
        avatar_color = generate_random_color()
        avatar_id = generate_random_id()

        # Create a new user document
        new_user = User(email, password, email, avatar_bg, avatar_color, avatar_id)
        db.users.insert_one(new_user.__dict__)

        return jsonify({"message": "User created successfully"}), 201

    except Exception as e:
        print(e)
        return jsonify({"message": "Internal server error"}), 500


@app.route("/login", methods=["POST"])
def login():
    """Authenticate and log in a user."""
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        user = db.users.find_one({"email": email})
        if not user or password != user["password"]:
            return jsonify({"msg": "Invalid credentials"}), 401

        # Convert ObjectId to string for JSON serialization
        user["_id"] = str(user["_id"])

        # Set the expiration time for the access token to 30 days
        expires = timedelta(days=30)
        access_token = create_access_token(
            identity=user["email"], expires_delta=expires
        )

        return (
            jsonify({"success": True, "access_token": access_token, "user": user}),
            200,
        )

    except Exception as e:
        print(e)
        return jsonify({"msg": "Internal server error"}), 500


@app.route("/getuserdata", methods=["POST"])
@jwt_required()
def get_user_data():
    """Retrieve user data for the authenticated user."""
    try:
        data = request.get_json()
        # Get the user's email from the JWT token
        current_user_email = get_jwt_identity()

        # Query the database for the user data using the email
        user_data = db.users.find_one({"email": current_user_email})

        if not user_data:
            return jsonify({"message": "User not found"}), 404
        else:
            # Convert ObjectId to string for JSON serialization
            user_data["_id"] = str(user_data["_id"])

            # Remove sensitive information (password) before sending the response
            user_data.pop("password", None)

            return jsonify({"user": user_data}), 200

    except Exception as e:
        print(e)
        return jsonify({"message": "An error occurred on the server side"}), 500


stop_processing = False  # Flag to indicate whether processing should stop


@app.route("/stop", methods=["GET"])
def stop_analysis():
    global stop_processing
    stop_processing = True
    return ({"message": "Processing stopped"}), 400


@app.route("/analyze", methods=["POST"])
def analysis():
    try:
        global stop_processing
        if stop_processing == True:
            stop_processing = False
        # Extract form data
        if "video" not in request.files:
            return jsonify({"error": "No video file provided"}), 400

        # Access the video file from the request
        video_file = request.files["video"]
        user_mail = request.form["user_mail"]
        video_name = request.form["video_name"]
        video_description = request.form["video_description"]
        time_stamp = request.form["time_stamp"]

        # Ensure the 'uploads' directory exists
        if not os.path.exists("uploads"):
            os.makedirs("uploads")

        path = os.path.join("uploads/video.mp4")
        video_file.save(path)

        model = YOLO("weights.pt")
        cap = cv2.VideoCapture(path)

        analysis_results = []
        initial_timestamp = 0
        frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        frames_per_second = cap.get(cv2.CAP_PROP_FPS)
        current_frame = 0
        processing_time_sum = 0
        processed_frames = 0

        while cap.isOpened() and not stop_processing:
            ret, frame = cap.read()
            if not ret:
                break
            if stop_processing:
                break

            start_time = time.time()

            # Perform person detection
            results = model(frame)

            # Perform person detection
            detections = []

            for i in results:
                boundingBoxes = i.boxes
                for box in boundingBoxes:
                    confidence = math.ceil(box.conf[0] * 100) / 100
                    classIdx = int(box.cls[0])
                    currentClass = class_names[classIdx]
                    if currentClass == "crash" and confidence > 0.85:
                        current_timestamp = cap.get(cv2.CAP_PROP_POS_MSEC) / 1000.0
                        if initial_timestamp == 0:
                            detections.append(
                                {
                                    "class": currentClass,
                                    "confidence": confidence,
                                    "timestamp": current_timestamp,
                                }
                            )
                            analysis_results.append(detections)
                            initial_timestamp = current_timestamp
                        else:
                            delta_time = current_timestamp - initial_timestamp
                            if delta_time > 3:
                                detections.append(
                                    {
                                        "class": currentClass,
                                        "confidence": confidence,
                                        "timestamp": current_timestamp,
                                    }
                                )
                                analysis_results.append(detections)
                                initial_timestamp = current_timestamp

            end_time = time.time()
            # Processing current frame
            current_frame += 1
            # Calculate percentage progress completed
            progress = calculate_progress(current_frame, frame_count)

            processing_time = end_time - start_time
            processing_time_sum += processing_time
            remaining_frames = frame_count - current_frame

            # Calculate average processing time per frame
            avg_processing_time = processing_time_sum / current_frame

            estimated_remaining_time = calculate_remaining_time(
                remaining_frames, avg_processing_time
            )

            # Backend logs
            log_data = {
                "progress": progress,
                "estimated_remaining_time": estimated_remaining_time
                # Add more relevant information here
            }
            socketio.emit("progress_update", log_data)

        # Create a dictionary for the video information
        video_info = {
            "video_name": video_name,
            "video_description": video_description,
            "time_stamp": time_stamp,
            "analysis_results": analysis_results,
        }

        db.users.update_one(
            {"email": user_mail}, {"$push": {"upload_video_list": video_info}}
        )
        # Delete the video file after analysis
        os.remove(path)
        return jsonify({"message": "Analysis Completed"}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "An error occurred during video analysis"}), 500


def calculate_progress(current_frame, total_frames):
    return (current_frame / total_frames) * 100


def calculate_remaining_time(remaining_frames, avg_processing_time):
    if avg_processing_time == 0:
        return "N/A"  # Avoid division by zero

    seconds_remaining = remaining_frames * avg_processing_time
    minutes = int(seconds_remaining // 60)
    seconds = int(seconds_remaining % 60)
    return f"{minutes} min {seconds} sec"


# =============================================================================
#                                RUN SERVER
# =============================================================================
if __name__ == "__main__":
    app.run()
