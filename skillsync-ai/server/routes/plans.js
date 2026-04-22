const express = require("express");
const Plan = require("../models/Plan");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// @route   GET api/plans
// @desc    Get all user plans
router.get("/", auth, async (req, res) => {
  try {
    const plans = await Plan.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(plans);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route   POST api/plans
// @desc    Create a plan
router.post("/", auth, async (req, res) => {
  try {
    const newPlan = await Plan.create({ ...req.body, user: req.user });
    res.json(newPlan);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/plans/:id
// @desc    Update a plan status
router.put("/:id", auth, async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).json({ msg: "Plan not found" });

    if (plan.user.toString() !== req.user) return res.status(401).json({ msg: "User not authorized" });

    plan.status = req.body.status || plan.status;
    await plan.save();
    res.json(plan);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/plans/:id
// @desc    Delete a plan
router.delete("/:id", auth, async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).json({ msg: "Plan not found" });
    if (plan.user.toString() !== req.user)
      return res.status(401).json({ msg: "User not authorized" });
    await Plan.findByIdAndDelete(req.params.id);
    res.json({ msg: "Plan removed" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
