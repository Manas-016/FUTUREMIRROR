const Simulation = require("../models/simulation.model");

exports.getRecentSimulations = async (req, res) => {
  try {
    const simulations = await Simulation.find({
      user: req.user._id
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: simulations,
    });
  } catch (error) {
  console.log("FULL ERROR:", error);
  res.status(500).json({
    success: false,
    message: "Failed to fetch recent simulations",
  });
}
};