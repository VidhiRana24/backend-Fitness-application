const trainerService = require("./trainerService"); // Adjust the path as needed
const jwt = require("jsonwebtoken");

const { Request, Response } = require("express");

const createTrainerControllerFn = async (req, res) => {
  try {
    console.log(req.body);
    const status = await trainerService.createTrainerDBService(req.body);
    console.log(status);

    if (status) {
      res.send({ status: true, message: "Trainer Created Successfully" });
    } else {
      res.send({ status: false, message: "Error Creating Trainer" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, message: "Internal Server Error" });
  }
};

var loginTrainerControllerFn = async (req, res) => {
  try {
    const result = await trainerService.loginTrainerDBService(req.body);

    // Check if login was successful
    if (result.status) {
      const trainer = result.trainer; // Assuming trainer data is returned from loginTrainerDBService

      // Generate JWT token
      const token = jwt.sign({ trainerId: trainer._id }, "MY_PROJECT", {
        expiresIn: "1h",
      });

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

module.exports = { createTrainerControllerFn, loginTrainerControllerFn };
