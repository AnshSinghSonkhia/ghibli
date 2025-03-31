const Jimp = require("jimp");

async function ghibliify(inputPath, outputPath) {
  try {
    const image = await Jimp.read(inputPath);

    // Apply Ghibli-style effects
    image.brightness(0.1)  // Slight brightness boost
         .contrast(0.2)    // Enhance contrast for a dreamy effect
         .color([{ apply: "saturate", params: [15] }])  // Boost colors
         .blur(1)          // Soft blur for a painterly effect
         .posterize(10);   // Reduce colors to mimic animation shading

    await image.writeAsync(outputPath);
    console.log(`Ghibli-style filter applied: ${outputPath}`);
  } catch (error) {
    console.error("Error processing image:", error);
  }
}

module.exports = ghibliify;
