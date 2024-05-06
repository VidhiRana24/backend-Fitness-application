const express = require("express");
const router = express.Router();
const userController = require("../src/user/userController");
const trainerController = require("../src/traineer/traineerController");
const workoutController = require("../src/workout-plan/workoutController"); // Import workout controller
const authMiddleware = require("../middleware/authMiddleware");
const paymentController = require("../src/pqayment]/paymentController");
const profileController = require("../src/profile/profileController");
const packageController = require("../src/packages/packageController"); // User routes

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

router.post(
  "/payments",
  authMiddleware,
  paymentController.createPaymentControllerFn
);

// Route to get payment by ID
router.get(
  "/payments/:paymentId",
  authMiddleware,
  paymentController.getPaymentByIdControllerFn
);
router.patch(
  "/payments/:paymentId",
  authMiddleware,
  paymentController.updatePaymentStatusControllerFn
);
router.post(
  "/profile/:userId/create",
  authMiddleware,
  profileController.createProfileControllerFn
);
router.get(
  "/profile/:userId",
  authMiddleware,
  profileController.getProfileByUserIdControllerFn
);
router.patch(
  "/profile/:userId",
  authMiddleware,
  profileController.updateProfileControllerFn
);
router.delete(
  "/profile/:userId",
  authMiddleware,
  profileController.deleteProfileControllerFn
);

router.post(
  "/packages",
  authMiddleware,
  packageController.createPackageControllerFn
);

// Update a package by ID
router.patch(
  "/packages/:id",
  authMiddleware,
  packageController.updatePackageStatusControllerFn
);

// Delete a package by ID
router.delete(
  "/packages/:id",
  authMiddleware,
  packageController.deletePackageControllerFn
);

// Example of a protected route
router.route("/protected").get(authMiddleware, (req, res) => {
  res.send({ message: "Protected route accessed successfully" });
});

module.exports = router;
