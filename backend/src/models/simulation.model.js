const mongoose = require("mongoose");

const simulationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["essential", "luxury", "work", "investment"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    impactLevel: {
      type: String,
      enum: ["Low", "Moderate", "High"],
    },

    regretIndex: Number,
    opportunityCost: Number,
    affordabilityRatio: Number,

    result: {
      ifBuy: {
        energy: Number,
        confidence: Number,
        savings: Number,
        productivity: Number,
        financialHealth: Number,
      },
      ifDont: {
        energy: Number,
        confidence: Number,
        savings: Number,
        productivity: Number,
        financialHealth: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);

// For fast dashboard recent fetch
simulationSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("Simulation", simulationSchema);