// trainerModel.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trainerSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    // Add any additional fields specific to trainers
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trainer", trainerSchema);
