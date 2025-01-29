const express = require("express");
const { createCanvas } = require("canvas");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const text = req.query.text || "Default Text";
  const width = 800;
  const height = 400;

  // Create a canvas
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  // Background color
  context.fillStyle = "#FFFFFF";
  context.fillRect(0, 0, width, height);

  // Text settings
  context.font = "60px Sans-serif";
  context.fillStyle = "#000000";
  context.textAlign = "center";
  context.textBaseline = "middle";

  // Add text to the canvas
  context.fillText(text, width / 2, height / 2);

  // Send response
  res.setHeader("Content-Type", "image/png");
  canvas.pngStream().pipe(res);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://10.0.100.134:${PORT}`);
});
