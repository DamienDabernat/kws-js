# Project Overview
This project uses TensorFlow.js to predict labels from audio input files. It includes a web interface for users to upload audio files and display predictions. The core functionality is handled by app.js, which processes audio data, interacts with a TensorFlow.js model, and displays predictions.

## How the Project Works
The project consists of an HTML file (index.html) that serves as the user interface. Users can upload audio files, which are then processed and analyzed by the TensorFlow.js model included in the project. The main logic is contained within app.js, which orchestrates the entire process from audio input to prediction output.

## Machine Learning Model Details

**Input**
The model accepts audio data as input, specifically expecting:

- Format: WAV file
- Channel: Mono
- Sample Rate: 16 kHz
- Duration: Exactly 1 second (16,000 samples)

**Output**
The output from the model is a tensor representing the probability distribution across various predefined labels. The highest probability label is considered the prediction result, which is displayed to the user.

## TensorFlow.js and Model Files
TensorFlow.js is an open-source library that allows running machine learning models directly in the browser using JavaScript. In this project, TensorFlow.js processes audio data and makes predictions using a pre-trained model.

`model.json`: This file contains the model architecture.
`.bin files`: These are binary files that contain the weights of the model, used by model.json to make predictions.

## Model Training
The model was trained on 200,000 keywords across 10 categories, making it robust in recognizing and categorizing audio inputs according to these trained categories.

## Key Processes
The prediction process is divided into several steps to modularize concerns:

1. Decode Audio File: Converts the uploaded audio file into an AudioBuffer.
2. Process Audio Buffer: Adjusts the AudioBuffer to match the model's input requirements (mono, 16 kHz).
3. Load Model: Loads the TensorFlow model from model.json and its associated .bin files.
4. Execute Model: Runs the model with the processed audio to get predictions.
5. Handle Prediction: Processes the output tensor to extract and display the most likely prediction.

These steps ensure that the audio data is correctly formatted for the model, that the model is ready for execution, and that the results are interpreted and displayed appropriately.

## Running the Project

To use this project, you must serve the files on a local server. Directly opening the index.html file will not work because the TensorFlow.js model requires http requests to load and run. Follow these steps to set up a local server:

1. Install a simple server by running `npm install -g serve`
2. Navigate to your project directory: `cd votre_projet`
3. Start the server: `serve`

Then, in a browser that supports TensorFlow.js (such as Chrome or Firefox):

- Navigate to `http://localhost:3000`
- Use the file input to upload an audio file (preferably in .wav format). See the samples folder for example audio files.
- Click the "Predict" button to see the prediction.

The project's directory should include:

- `app.js`: Contains the project's main functionality.
- `index.html`: User interface for interacting with the model.
- `tfjs_model/`: Directory containing model.json and .bin files.
- `samples/`: Directory containing sample audio files for testing.

Ensure you have an internet connection to load TensorFlow.js from its CDN as specified in the script tag in index.html.
