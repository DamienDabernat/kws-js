# How to convert the TensorFlow model to TensorFlow.js

To convert the TensorFlow model to TensorFlow.js, you can use the `tensorflowjs_converter` tool.
Here's an example command to convert a TensorFlow SavedModel to TensorFlow.js format:

```bash
tensorflowjs_converter --input_format=tf_saved_model --output_format=tfjs_graph_model ./KWS_E2E_TF_Model_v1.43 ./tfjs_model
```
