const Workout = require("./workoutModel");

// Service functions
exports.createWorkoutPlan = async (workoutData) => {
  try {
    return await Workout.create(workoutData);
  } catch (error) {
    throw Error("Error creating workout plan in database");
  }
};

exports.getAllWorkoutsFromDB = async () => {
  try {
    return await Workout.find();
  } catch (error) {
    throw Error("Error retrieving workouts from database");
  }
};

exports.getWorkoutByIdFromDB = async (workoutId) => {
  try {
    return await Workout.findById(workoutId);
  } catch (error) {
    throw Error("Error retrieving workout by ID from database");
  }
};

exports.updateWorkoutByIdInDB = async (workoutId, updatedWorkoutData) => {
  try {
    // console.log(updateWorkoutIdInDB);
    return await Workout.findByIdAndUpdate(workoutId, updatedWorkoutData, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    throw Error("Error updating workout by ID in database");
  }
};

exports.deleteWorkoutByIdFromDB = async (workoutId) => {
  try {
    return await Workout.findByIdAndDelete(workoutId);
  } catch (error) {
    throw Error("Error deleting w   orkout by ID from database");
  }
};
exports.getWorkoutPlanForUser = async (userId) => {
  try {
    // Fetch workout plan associated with the user ID
    const workoutPlan = await Workout.findOne({ createdBy: userId });
    
    // Return the workout plan
    return workoutPlan;
  } catch (error) {
    console.error("Error fetching workout plan for user:", error);
    throw new Error("Failed to fetch workout plan for user");
  }
};