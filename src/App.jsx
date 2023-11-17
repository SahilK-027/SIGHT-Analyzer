import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginSignUpPage from "./Pages/LoginPage/LoginSignUpPage";
import NotFoundPage from "./Pages/404/NotFoundPage";
import AnalyzerPage from "./Pages/Home-Dashboard/Analyzer/AnalyzerPage";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import SERVER_LINK from "./API";  // Corrected typo in the import
import Cookies from "universal-cookie";
import Loading from "./Pages/Loading/Loading";

const cookies = new Cookies();

function App() {
  // State to manage the user's information
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Check for an existing token on app initialization
  useEffect(() => {
    const token = cookies.get('access_token');

    if (token) {
      // If a token exists, attempt to log in the user
      handleLogin(token);
    }
  }, []);

  // Function to handle user login with a provided token
  const handleLogin = async (token) => {
    setLoading(true);
    try {
      const response = await fetch(`${SERVER_LINK}/getuserdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          token: token,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Save the JWT token in a cookie with a 30-day expiration
        cookies.set('access_token', token, {
          path: '/', // accessible on all pages
          maxAge: 2592000, // max age 30 days
        });
        // Set the user state with the retrieved user data
        setUser(data.user);
      } else {
        // Handle errors in case of unsuccessful login
        const error = await response.json();
        // Display an error toast notification with the error message
        toast.error(`${error.message}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      // Display a network error toast notification
      toast.error(`Network Error: ${error.message}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Loading />
      </>
    )
  }

  return (
    <>
      {/* BrowserRouter to manage routing in the application */}
      <BrowserRouter>
        {/* Define application routes */}
        <Routes>
          {/* If a user is logged in, navigate to the Analyzer page; otherwise, show the login/signup page */}
          <Route path="/" element={user ? <Navigate to="/home/analyze" /> : <LoginSignUpPage onLogin={handleLogin} />} />
          {/* If a user is logged in, show the Analyzer page; otherwise, navigate to the home page */}
          <Route path="/home/analyze" element={user ? <AnalyzerPage user={user} /> : <Navigate to="/" />} />
          {/* Show a not found page for any other routes */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>

      {/* ToastContainer for displaying toast notifications */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
