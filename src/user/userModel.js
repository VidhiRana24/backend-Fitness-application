const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
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
    hasCreatedWorkoutPlan: { type: Boolean, default: false }

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
