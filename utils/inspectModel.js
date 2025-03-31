const ort = require("onnxruntime-node");

async function inspectModel(modelPath) {
  try {
    const session = await ort.InferenceSession.create(modelPath);
    console.log("Model Inputs:", session.inputNames);
  } catch (error) {
    console.error("Error loading model:", error);
  }
}

inspectModel("./models/AnimeGANv3_Hayao_36.onnx");
