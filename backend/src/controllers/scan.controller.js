const fs = require("fs");
const axios = require("axios");

exports.scanImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // Convert image to base64
    const imageBase64 = fs.readFileSync(req.file.path, {
      encoding: "base64",
    });

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llava",
        prompt: `
Analyze this product image.

1. Identify the product.
2. Estimate realistic price in INR and do not give range just give price.
3. Categorize as "essential", "luxury", or "work".
4. Give confidence score (0-100).

Return ONLY JSON:
{
  "product": "",
  "estimatedPriceINR": number,
  "category": "",
  "confidence": number
}
        `,
        images: [imageBase64],
        stream: false
      }
    );

    // Delete temp file
    fs.unlinkSync(req.file.path);

    const aiText = response.data.response;

    // Extract JSON safely
    const match = aiText.match(/\{[\s\S]*\}/);

    if (!match) {
      return res.status(500).json({
        message: "AI did not return valid JSON",
        raw: aiText
      });
    }

    const parsed = JSON.parse(match[0]);

    if (parsed.confidence < 40) {
      return res.status(400).json({
        message: "Product not recognized clearly"
      });
    }

    res.json(parsed);

  } catch (error) {
    console.error("OLLAMA ERROR:", error.message);
    res.status(500).json({ message: "Vision analysis failed" });
  }
};