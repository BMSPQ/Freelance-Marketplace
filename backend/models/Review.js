const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    review: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

// One review per project by one client
reviewSchema.index(
  {
    project: 1,
    client: 1,
  },
  {
    unique: true,
  }
);

// Faster queries
reviewSchema.index({ freelancer: 1 });
reviewSchema.index({ project: 1 });

module.exports = mongoose.model("Review", reviewSchema);