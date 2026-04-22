const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, required: true },
  topic: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("Plan", planSchema);
