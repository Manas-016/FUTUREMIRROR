const Simulation = require("../models/simulation.model");

exports.simulateImpact = async (req, res) => {
  try {
    const { price, category, title } = req.body;
    const monthlyIncome = req.user.monthlyIncome;

    const affordabilityRatio = price / monthlyIncome;
    const stressScore = Math.min(100, affordabilityRatio * 120);

    const futureValue = price * (1 + 0.10 / 2);
    const opportunityCost = Math.round(futureValue - price);

    // IF YOU BUY
    const buy = {
      energy: Math.max(50, 90 - stressScore * 0.4),
      confidence:
        category === "luxury"
          ? 90
          : category === "work"
          ? 85
          : 75,
      savings: -price,
      productivity:
        category === "work"
          ? 90
          : category === "investment"
          ? 85
          : 65,
      financialHealth: Math.max(30, 85 - stressScore)
    };

    // IF YOU DON'T BUY
    const dont = {
      energy: 75 + (stressScore < 40 ? 5 : -5),
      confidence:
        category === "luxury"
          ? 70
          : category === "work"
          ? 65
          : 75,
      savings: price + opportunityCost,
      productivity:
        category === "work"
          ? 60
          : category === "investment"
          ? 80
          : 70,
      financialHealth: Math.min(95, 85 + stressScore * 0.3)
    };

    const regretIndex =
      category === "luxury"
        ? 60 + affordabilityRatio * 40
        : 30 + affordabilityRatio * 20;

    // ✅ SAVE TO DATABASE
    const simulation = await Simulation.create({
      user: req.user._id,
      title,
      category,
      amount: price,
      impactLevel:
        stressScore > 70
          ? "High"
          : stressScore > 40
          ? "Moderate"
          : "Low",
      score: Math.round(regretIndex),
      result: {
        affordabilityRatio,
        opportunityCost,
        regretIndex: Math.round(regretIndex),
        ifBuy: buy,
        ifDont: dont
      }
    });

    // ✅ SEND RESPONSE
    res.status(201).json({
      success: true,
      data: simulation
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Simulation failed"
    });
  }
};
exports.getSimulationById = async (req, res) => {
  try {
    const simulation = await Simulation.findOne({
      _id: req.params.id,
      user: req.user._id, // ensures user can only access their own simulations
    });

    if (!simulation) {
      return res.status(404).json({
        success: false,
        message: "Simulation not found",
      });
    }

    res.status(200).json({
      success: true,
      data: simulation,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch simulation",
    });
  }
};