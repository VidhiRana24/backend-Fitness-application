const workoutService = require("./workoutService");
const jwt = require("jsonwebtoken");

// Controller functions
exports.getAllWorkouts = async (req, res) => {
  try {
    const workouts = await workoutService.getAllWorkoutsFromDB();
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getWorkoutById = async (req, res) => {
  try {
    const workout = await workoutService.getWorkoutByIdFromDB(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.json(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createWorkout = async (req, res) => {
  try {
    const newWorkout = await workoutService.createWorkoutPlan(req.body);
    res.status(201).json(newWorkout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateWorkoutById = async (req, res) => {
  try {
    const workout = await workoutService.updateWorkoutByIdInDB(
      req.params.id,
      req.body
    );

    console.log("Updated workout:", workout); // Log the updated workout data

    if (!workout) {
      console.log("Workout not found");
      return res.status(404).json({ message: "Workout not found" });
    }

    res.json(workout);
  } catch (err) {
    console.error("Error updating workout:", err); // Log any errors that occur
    res.status(400).json({ message: err.message });
  }
};

exports.deleteWorkoutById = async (req, res) => {
  try {
    const workout = await workoutService.deleteWorkoutByIdFromDB(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.json({ message: "Workout deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createWorkoutPlan = async (req, res) => {
  try {
    // Verify token
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decodedToken = jwt.verify(token, "MY_PROJECT");
    console.log("Token decoded successfully:", decodedToken);

    // Extract user ID from decoded token
    const userId = decodedToken.userId;

    // Create workout plan associated with the user
    const workoutData = {
      title: req.body.title,
      description: req.body.description,
      createdBy: userId,
    };

    const createdWorkout = await workoutService.createWorkoutPlan(workoutData);
    res.status(201).json(createdWorkout);
  } catch (error) {
    console.error("Error creating workout plan:", error);
    res
      .status(500)
      .json({ message: "Failed to create workout plan", error: error.message });
  }
};
