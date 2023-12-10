const express = require("express");
const adminRouter = express.Router();
const {
  generateCoupon,
  generateStats,
} = require("../controllers/admin.controller");

adminRouter.get("/generate-coupon", async (req, res) => {
  try {
    const updatedUser = await generateCoupon();
    res.status(201).json({ user: updatedUser, message: "Coupon generated." });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate coupon." });
  }
});

adminRouter.get("/generate-stats", async (req, res) => {
  try {
    const updatedUser = await generateStats();
    res.status(201).json({ user: updatedUser, message: "Stats generated." });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate stats." });
  }
});

module.exports = adminRouter;
