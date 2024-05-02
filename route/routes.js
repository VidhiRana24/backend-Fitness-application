const express = require("express");
const router = express.Router();
const userController = require("../src/user/userController");
const trainerController = require("../src/traineer/traineerController");
const workoutController = require("../src/workout-plan/workoutController"); // Import workout controller
const authMiddleware = require("../middleware/authMiddleware");
const paymentController = require("../src/payment/paymentController");

// User routes
router.route("/user/login").post(userController.loginUserControllerFn);
router.route("/user/create").post(userController.createUserControllerFn);

// Trainer routes
router.route("/trainer/login").post(trainerController.loginTrainerControllerFn);
router
  .route("/trainer/create")
  .post(trainerController.createTrainerControllerFn);

// Workout routes
router.post(
  "/workoutplan/create",
  authMiddleware,
  workoutController.createWorkoutPlan
); // Apply verifyToken middleware to createWorkoutPlan route
router.patch(
  "/workoutplan/:id",
  authMiddleware,
  workoutController.updateWorkoutById
);

// Delete workout plan by ID (DELETE)
router.delete(
  "/workoutplan/:id",
  authMiddleware,
  workoutController.deleteWorkoutById
);

router.post("/payments", paymentController.createPaymentControllerFn);

// Route to get payment by ID
router.get(
  "/payments/:paymentId",
  paymentController.getPaymentByIdControllerFn
);

// Example of a protected route
router.route("/protected").get(authMiddleware, (req, res) => {
  res.send({ message: "Protected route accessed successfully" });
});

module.exports = router;
