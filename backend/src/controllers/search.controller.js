const axios = require("axios");

exports.searchItem = async (req, res) => {
  try {
    const { item } = req.body;

    if (!item || item.length < 3) {
      return res.status(400).json({
        message: "Please enter a valid product name"
      });
    }

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llava",   // 👈 using llava instead
        prompt: `
User input: "${item}"

1. Correct spelling if needed.
2. Estimate realistic price in INR.
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
        stream: false
      }
    );

    const aiText = response.data.response;

    const match = aiText.match(/\{[\s\S]*\}/);

    if (!match) {
      return res.status(500).json({
        message: "AI returned invalid format",
        raw: aiText
      });
    }

    const parsed = JSON.parse(match[0]);

    if (parsed.confidence < 40) {
      return res.status(400).json({
        message: "Product not recognized"
      });
    }

    res.json(parsed);

  } catch (error) {
    console.error("SEARCH ERROR:", error.message);
    res.status(500).json({ message: "Search failed" });
  }
};