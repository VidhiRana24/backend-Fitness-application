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
      res.json({ status: true, message: "Login successful", token: token });
    } else {
      // Send response with login failure message
      res.json({ status: false, message: result.msg });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Error logging in" });
  }
};
module.exports = { createUserControllerFn, loginUserControllerFn };
