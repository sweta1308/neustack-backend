const express = require("express");
const adminRouter = express.Router();
const {
  generateCoupon,
  generateStats,
} = require("../controllers/admin.controller");

adminRouter.get("/generate-coupon", async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      res.status(404).json({
        error: "The email you entered is not registered. Not found error.",
      });
    } else {
      const updatedUser = await generateCoupon(userId);
      res.status(201).json({ user: updatedUser, message: "Coupon generated." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to generate coupon." });
  }
});

adminRouter.get("/generate-stats", async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      res.status(404).json({
        error: "The email you entered is not registered. Not found error.",
      });
    } else {
      const updatedUser = await generateStats(userId);
      res.status(201).json({ user: updatedUser, message: "Stats generated." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to generate stats." });
  }
});

module.exports = adminRouter;
