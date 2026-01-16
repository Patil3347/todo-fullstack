const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number,
      default: 0
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
