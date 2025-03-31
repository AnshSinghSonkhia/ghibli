# Ghibli

Transform your images with a stunning Studio Ghibli-style filter! ✨ ghibli enhances brightness, boosts vibrant colors, softens edges, and applies a dreamy painterly effect—bringing the magic of Ghibli films like Spirited Away and My Neighbor Totoro to your photos. Perfect for anime-style artwork, aesthetic edits, and nostalgic visuals.

[![npm](https://img.shields.io/npm/v/ghibli.svg)](https://www.npmjs.com/package/ghibli)  [![License](https://img.shields.io/npm/l/ghibli.svg)](LICENSE) 

# 📦 Installation

Install via npm

```sh
npm i ghibli
```

Install via yarn

```sh
yarn add ghibli
```

# 🚀 Usage

```js
const { ghiblify } = require("ghibli");

ghiblify("input.jpg", "output.jpg");
```

# 📖 API Reference: ghiblify Function

| Function       | Description                                                                                     |
|----------------|-------------------------------------------------------------------------------------------------|
| `ghiblify`    | Applies a Studio Ghibli-style filter to an image, enhancing brightness, boosting colors, softening edges, and adding a painterly effect. |
| **Parameters** |                                                                                                 |
| `inputPath`    | Path to the input image file.                                                                   |
| `outputPath`   | Path to save the output image file.                                                             |