const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    species: {
      type: String,
      required: true,
      enum: ["dog", "cat", "other"],
    },

    breed: {
      type: String,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
      min: 0,
    },

    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },

    description: {
      type: String,
      trim: true,
    },

    images: {
      type: [String],
      default: [],
    },

    location: {
      type: String,
      trim: true,
    },

    adoptionStatus: {
      type: String,
      enum: ["available", "pending", "adopted"],
      default: "available",
    },

    organization: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Organization",
     required: true,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Animal", animalSchema);