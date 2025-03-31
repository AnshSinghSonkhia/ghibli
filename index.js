const ghiblify = require("./src/ghiblify");
const ghibliAnimeTransform = require("./src/ghibliAnimeTransform");

module.exports = { ghiblify, ghibliAnimeTransform };

// ghiblify("test.jpeg", "output.jpeg");

// Apply AI-based transformation (Hayao-style)
ghibliAnimeTransform("test2.jpeg", "output_hayao.jpeg", "hayao");

// Apply AI-based transformation (Shinkai-style)
ghibliAnimeTransform("test2.jpeg", "output_shinkai.jpeg", "shinkai");