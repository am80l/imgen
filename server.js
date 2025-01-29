const express = require("express");
const { createCanvas, loadImage } = require("canvas");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  const text = req.query.text || "Default Text";
  const imageUrl1 = req.query.image1;
  const imageUrl2 = req.query.image2;
  const width = 800;
  const height = 400;

  // Create a canvas
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  // Background color
  context.fillStyle = "#FFFFFF";
  context.fillRect(0, 0, width, height);

  // Render images side by side
  try {
    if (imageUrl1 && imageUrl2) {
      const img1 = await loadImage(imageUrl1);
      const img2 = await loadImage(imageUrl2);

      const imgWidth = width / 2;
      const imgHeight = height;

      // Draw the first image on the left half
      context.drawImage(img1, 0, 0, imgWidth, imgHeight);
      // Draw the second image on the right half
      context.drawImage(img2, imgWidth, 0, imgWidth, imgHeight);
    }
  } catch (error) {
    console.error("Error loading images:", error);
    context.fillStyle = "#FF0000";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("Error loading images", width / 2, height / 2);
  }

  // Text settings
  context.font = "20px Sans-serif";
  context.fillStyle = "#000000";
  context.textAlign = "center";
  context.textBaseline = "middle";

  // Add text to the canvas
  context.fillText(text, width / 2, height - 20);

  // Send response
  res.setHeader("Content-Type", "image/png");
  canvas.pngStream().pipe(res);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
