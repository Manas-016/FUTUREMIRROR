exports.manualEntry = (req, res) => {
  try {
    const { product, price, category } = req.body;

    if (!product || !price || !category) {
      return res.status(400).json({
        message: "Product, price, and category are required"
      });
    }

    if (price <= 0) {
      return res.status(400).json({
        message: "Price must be greater than 0"
      });
    }

    const allowedCategories = ["essential", "luxury", "work"];

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        message: "Invalid category"
      });
    }

    res.json({
      product,
      estimatedPriceINR: price,
      category
    });

  } catch (error) {
    res.status(500).json({
      message: "Manual entry failed"
    });
  }
};