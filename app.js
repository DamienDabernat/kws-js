/**
 * Initializes the audio context for the browser.
 * @returns {AudioContext} The initialized audio context.
 */
function getAudioContext() {
    return new (window.AudioContext || window.webkitAudioContext)();
}

/**
 * Asynchronously loads the TensorFlow model from a specified path.
 * @returns {Promise<tf.GraphModel>} The loaded TensorFlow model.
 */
async function loadModel() {
    const modelPath = 'tfjs_model/model.json';
    return await tf.loadGraphModel(modelPath);
}

/**
 * Reads an audio file and decodes it into an AudioBuffer.
 * @param {File} file The audio file to read.
 * @returns {Promise<AudioBuffer>} The decoded AudioBuffer.
 */
async function decodeAudioFile(file) {
    const arrayBuffer = await file.arrayBuffer();
    const audioContext = getAudioContext();
    return await audioContext.decodeAudioData(arrayBuffer);
}

/**
 * Processes the audio buffer to match the input requirements of the TensorFlow model.
 * @param {AudioBuffer} audioBuffer The audio buffer to process.
 * @returns {tf.Tensor3D} The processed audio as a 3D tensor.
 */
function processAudioBuffer(audioBuffer) {
    const targetSampleRate = 16000;
    const inputLength = 16000;
    const offlineContext = new OfflineAudioContext(
        audioBuffer.numberOfChannels,
        audioBuffer.duration * targetSampleRate,
        targetSampleRate
    );

    const bufferSource = offlineContext.createBufferSource();
    bufferSource.buffer = audioBuffer;
    bufferSource.connect(offlineContext.destination);
    bufferSource.start(0);

    return offlineContext.startRendering().then(renderedBuffer => {
        let inputData = renderedBuffer.getChannelData(0);
        if (inputData.length > inputLength) {
            inputData = inputData.slice(0, inputLength);
        } else if (inputData.length < inputLength) {
            // Fill the remaining input with zeros if the audio is too short
            inputData = new Float32Array(inputLength).fill(0, 0, inputLength);
            inputData.set(renderedBuffer.getChannelData(0));
        }
        return tf.tensor3d(inputData, [1, inputLength, 1]);
    });
}


/**
 * Handles the TensorFlow model predictions by displaying the most likely prediction in the UI.
 * @param {tf.Tensor} outputTensor The output tensor from the model prediction.
 */
async function handlePrediction(outputTensor) {
    const prediction = await outputTensor.data();
    const highestPrediction = labels.map((label, index) => ({
        label: label, probability: prediction[index]
    })).sort((a, b) => b.probability - a.probability)[0];

    outputTensor.dispose();
    return { label: highestPrediction.label, probability: highestPrediction.probability };
}

/**
 * Orchestrates the loading, processing, and predicting of an audio file.
 */
async function loadAndPredict() {
    const fileInput = document.getElementById('audioUpload');
    const audioFile = fileInput.files[0];
    if (!audioFile) {
        console.log('Please upload an audio file.');
        return;
    }

    try {
        const startTime = performance.now();

        const audioBuffer = await decodeAudioFile(audioFile);
        const inputTensor = await processAudioBuffer(audioBuffer);
        const model = await loadModel();
        const outputTensor = await model.executeAsync(inputTensor);
        const result = await handlePrediction(outputTensor);

        const endTime = performance.now();
        const inferenceTime = endTime - startTime;

        document.getElementById('predictionOutput').textContent = `Prediction: ${result.label} with probability ${result.probability.toFixed(2)} in ${inferenceTime.toFixed(2)} ms`;
    } catch (error) {
        console.error('Error processing audio file:', error);
    }
}

const labels = [
    "background_noise", "forward", "groovit", "happy", "nine",
    "surpuissant", "two", "visual", "yes"
];
