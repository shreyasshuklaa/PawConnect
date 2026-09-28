const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
  type: String,
  required: true,
  minlength: 8,
  match: [
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/,
    "Password must contain at least 8 characters, one uppercase, one lowercase, and one special character."
  ]
},

    phone: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      enum: ["adopter", "shelter", "admin"],
      default: "adopter",
    },

    profileImage: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);