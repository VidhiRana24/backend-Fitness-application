const userService = require("./userServices"); // Adjust the path as needed
const jwt = require("jsonwebtoken");

const { Request, Response } = require("express");

const createUserControllerFn = async (req, res) => {
  try {
    console.log(req.body);
    const status = await userService.createUserDBService(req.body);
    console.log(status);

    if (status) {
      res.send({ status: true, message: "User Created Successfully" });
    } else {
      res.send({ status: false, message: "Error Creating User" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, message: "Internal Server Error" });
  }
};

var loginUserControllerFn = async (req, res) => {
  try {
    const result = await userService.loginuserDBService(req.body);

    // Check if login was successful
    if (result.status) {
      const user = result.user; // Assuming user data is returned from loginuserDBService

      // Generate JWT token with user ID and role
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        "MY_PROJECT",
        {
          expiresIn: "1h",
        }
      );

      // Send response with token
      res.json({ status: true, message: "Login successful", token: token, userId  :user._id });
    } else {
      // Send response with login failure message
      res.json({ status: false, message: result.msg });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Error logging in" });
  }
};

const updateUserControllerFn = async (req, res) => {
  try {
    const user = await userService.updateUserInDB(
      req.params.id,
      req.body
    );


    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error updating user:", err); // Log any errors that occur
    res.status(400).json({ message: err.message });
  }
};

const checkWorkoutPlanStatus = async (req, res) => { 
  try {
    // Check if user has created a workout plan
    const userId = req.userId; // Assuming userId is obtained from authentication middleware
    const user = await getUserById(userId);

    if (user && user.hasCreatedWorkoutPlan) {
      return res.status(200).json({ hasWorkoutPlan: true });
    } else {
      return res.status(200).json({ hasWorkoutPlan: false });
    }
  } catch (error) {
    console.error("Error checking workout plan status:", error);
    res.status(500).json({ message: "Failed to check workout plan status", error: error.message });
  }
};
module.exports = { createUserControllerFn, loginUserControllerFn, checkWorkoutPlanStatus,updateUserControllerFn  };
