## Welcome to SIGHT 👀
## Demo
https://github.com/SahilK-027/SIGHT-Analyzer/assets/104154041/ec59f05b-188c-4713-84f6-4eb4fb40975c

## Overview
This project is a video analysis application designed to leverage OpenCV and machine learning to provide timestamps for car accidents in recorded video footage. The application aims to enhance the process of analyzing traffic incidents by automatically detecting and timestamping car accidents.

## Features
- **OpenCV Integration:** Uses OpenCV for video processing and analysis.
- **Machine Learning:** Implements machine learning algorithms for car accident detection.
- **Timestamp Generation:** Automatically generates timestamps for identified car accidents.
- **User-Friendly Interface:** Provides an intuitive interface for users to interact with the application./vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## How do we calculate the reduction in false alarm percentage?
Given the precision values:
- `Precision_before`: 91.3%
- `Precision_after`: 93.8%

Calculate the false positive rate (FPR) before and after the improvement:
- FPR_before = 1 - `Precision_before`
- FPR_after = 1 - `Precision_after`
- FPR_before = 1 - 0.913 = 0.087
- FPR_after = 1 - 0.938 = 0.062

Now, calculate the reduction in false alarms percentage:
- Reduction = ((`FPR_before` - `FPR_after`) / `FPR_before`) * 100
- Reduction = ((0.087 - 0.062) / 0.087) * 100
- Reduction ≈ 28.74%

So, the improvement in precision from 91.3% to 93.8% resulted in approximately a `28.74%` reduction in false alarms.

## Improvements
<img width="619" alt="Screenshot 2024-03-05 at 4 41 06 PM" src="https://github.com/SahilK-027/SIGHT-Analyzer/assets/104154041/0d5d3dae-ab42-4e08-a906-f1de24df4546">

## Mathematical Model
### Input:

- **Input Image:** Denoted by X

#### Processing Stages:

##### 1. Feature Extraction Backbone:

- **Convolutional Layer Operation:**

  - **Input:** Feature map X
  - **Output:** Feature map Y
  - **Equation:**
    - Y(i, j) = Σ(u, v) X(i+u, j+v) \* W(u, v)

- **Max Pooling Operation:**
  - **Input:** Feature map X
  - **Output:** Downsampled feature map Y
  - **Equation:**
    - Y(i, j) = max(u, v) X(i+u, j+v)

##### 2. Object Detection Head:

- **Detection Layer Operation:**
  - **Input:** Feature map X
  - **Output:**
    - Bounding box coordinates bbox(i,j)
    - Objectness score conf(i,j)
    - Class probabilities class(i,j,c)
  - **Equation:**
    - bbox(i,j) = (tx(i,j) _ σ(tw(i,j)) + b(i,j), ty(i,j) _ σ(th(i,j)) + b(i,j))
    - conf(i,j) = σ(tc(i,j))
    - class(i,j,c) = pc(i,j,c) \* σ(t_c(i,j,c))

##### 3. Anchor Boxes:

- **Anchor Box Calculation:**
  - **Input:** None (Derived from the network)
  - **Output:** Anchor box dimensions w_a, h_a
  - **Equation:**
    - w_a = p_wa \* e^(t_w)
    - h_a = p_ha \* e^(t_h)

##### 4. Non-Maximum Suppression (NMS):

- **Input:** Set of bounding boxes B, Score threshold Σ, Intersection over Union threshold T
- **Output:** Selected bounding boxes β_i in B after NMS
- **Equation:**
  - NMS(B, Σ, T) = { β_i in B | ∀ β_i, β_j in B, i ≠ j: IoU(β_i, β_j) < T }

### Output:

- **Final Output:** Selected bounding boxes after NMS

## Frontend Setup
Download [Node.js](https://nodejs.org/en/download/).

Run the following commands:

``` bash
# Install dependencies (only the first time)
npm install

# Run the local server
npm run dev

# Build for production in the dist/ directory
npm run build
```

## Backend Setup
Download [Python](https://www.python.org/downloads/).

Run the following commands:

``` bash
# Install dependencies (only the first time)
pip install

# Run the local server
python3 api/server.py 
```
