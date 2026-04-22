const express = require("express");
const Habit = require("../models/Habit");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// @route   GET api/habits
router.get("/", auth, async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user });
    res.json(habits);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route   POST api/habits
router.post("/", auth, async (req, res) => {
  try {
    const habit = await Habit.create({ ...req.body, user: req.user });
    res.json(habit);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/habits/:id/complete
router.put("/:id/complete", auth, async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ msg: "Habit not found" });

    habit.streak += 1;
    habit.lastCompleted = new Date();
    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/habits/:id
router.delete("/:id", auth, async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ msg: "Habit not found" });

    if (habit.user.toString() !== req.user) return res.status(401).json({ msg: "User not authorized" });

    await Habit.findByIdAndDelete(req.params.id);
    res.json({ msg: "Habit removed" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
