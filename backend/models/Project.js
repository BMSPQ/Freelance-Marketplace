const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    budget: {
      type: Number,
      required: true,
      min: 1,
    },

    deadline: {
      type: Date,
      required: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: [
        "Open",
        "In Progress",
        "Completed",
        "Closed",
      ],
      default: "Open",
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster searching
projectSchema.index({ category: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ client: 1 });

module.exports = mongoose.model("Project", projectSchema);