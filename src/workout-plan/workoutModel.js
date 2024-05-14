const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to the user who created the workout plan
    fitnessGoals: { type: String }, // User's top fitness goal
    fitnessLevel: { type: String }, // User's current fitness level
    gender: { type: String }, // User's gender
    age: { type: Number }, // User's age
    height: { type: String }, // User's height
    weight: { type: Number }, // User's weight
    workoutFrequency: { type: String }, // How many times user workouts per week
    workoutLocation: { type: String }, // Where user typically works out
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
