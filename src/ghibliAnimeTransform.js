// const { InferenceSession } = require("onnxruntime-node");
// const Jimp = require("jimp");
// const fs = require("fs");

// async function ghibliAnimeTransform(inputPath, outputPath, modelPath = "models/generator_Hayao.onnx") {
//   try {
//     const session = await InferenceSession.create(modelPath);

//     // Load & preprocess image
//     let image = await Jimp.read(inputPath);
//     image = image.resize(256, 256).grayscale();  // Resize & normalize

//     // Convert image to tensor
//     const imageData = new Float32Array(image.bitmap.width * image.bitmap.height * 3);
//     let index = 0;
//     image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
//       imageData[index++] = this.bitmap.data[idx] / 255.0;     // Red
//       imageData[index++] = this.bitmap.data[idx + 1] / 255.0; // Green
//       imageData[index++] = this.bitmap.data[idx + 2] / 255.0; // Blue
//     });

//     const inputTensor = new onnx.Tensor("float32", imageData, [1, 3, 256, 256]);

//     // Run the model
//     const outputs = await session.run({ input: inputTensor });
//     const outputData = outputs.output.data;

//     // Convert tensor output back to image
//     const outputImage = new Jimp(256, 256);
//     index = 0;
//     outputImage.scan(0, 0, 256, 256, function(x, y, idx) {
//       this.bitmap.data[idx] = outputData[index++] * 255;
//       this.bitmap.data[idx + 1] = outputData[index++] * 255;
//       this.bitmap.data[idx + 2] = outputData[index++] * 255;
//       this.bitmap.data[idx + 3] = 255; // Alpha (fully opaque)
//     });

//     // Save output
//     await outputImage.writeAsync(outputPath);
//     console.log(`Anime transformation applied: ${outputPath}`);
//   } catch (error) {
//     console.error("Error processing image:", error);
//   }
// }

// module.exports = ghibliAnimeTransform;


const fs = require("fs");
const Jimp = require("jimp");
const ort = require("onnxruntime-node");

async function ghibliAnimeTransform(inputPath, outputPath, modelType = "hayao") {
  try {
    // Choose model based on type
    const modelPath = `./models/${modelType === "hayao" ? "AnimeGANv3_Hayao_36.onnx" : "AnimeGANv3_Shinkai_37.onnx"}`;

    if (!fs.existsSync(modelPath)) {
      throw new Error(`Model file not found: ${modelPath}`);
    }

    // Load the ONNX model
    const session = await ort.InferenceSession.create(modelPath);
    const inputName = "AnimeGANv3_input:0"; // As determined by inspectModel

    // Load and preprocess the image
    const image = await Jimp.read(inputPath);
    image.resize(512, 512).quality(100); // Resize to model input size

    // Create an input tensor in channel-last format [1, 512, 512, 3]
    const width = 512;
    const height = 512;
    const channels = 3;
    const inputTensorData = new Float32Array(width * height * channels);
    let idx = 0;
    // Jimp image data is stored in RGBA format, so skip the alpha channel.
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const pixelIndex = (y * width + x) * 4;
        inputTensorData[idx++] = image.bitmap.data[pixelIndex] / 255;       // Red
        inputTensorData[idx++] = image.bitmap.data[pixelIndex + 1] / 255;   // Green
        inputTensorData[idx++] = image.bitmap.data[pixelIndex + 2] / 255;   // Blue
      }
    }
    
    // Create the tensor with shape [1, 512, 512, 3]
    const tensor = new ort.Tensor("float32", inputTensorData, [1, height, width, channels]);

    // Run the ONNX model
    const feeds = {};
    feeds[inputName] = tensor;
    const results = await session.run(feeds);
    const outputTensor = results[session.outputNames[0]];
    const outputData = outputTensor.data;
    
    // Convert output tensor back to an image.
    // Assuming output shape is also [1, 512, 512, 3].
    const outputImage = new Jimp(width, height);
    idx = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const r = outputData[idx++] * 255;
        const g = outputData[idx++] * 255;
        const b = outputData[idx++] * 255;
        const pixelIndex = (y * width + x) * 4;
        outputImage.bitmap.data[pixelIndex] = r;
        outputImage.bitmap.data[pixelIndex + 1] = g;
        outputImage.bitmap.data[pixelIndex + 2] = b;
        outputImage.bitmap.data[pixelIndex + 3] = 255; // Fully opaque alpha
      }
    }
    
    await outputImage.writeAsync(outputPath);
    console.log(`Anime-style transformation applied: ${outputPath}`);
    
  } catch (error) {
    console.error("Error processing image:", error);
  }
}

module.exports = ghibliAnimeTransform;
