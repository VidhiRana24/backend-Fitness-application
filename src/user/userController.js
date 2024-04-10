const userService = require("./userServices"); // Adjust the path as needed

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
  var result = null;
  try {
    result = await userService.loginuserDBService(req.body);
    if (result.status) {
      res.send({ status: true, message: result.msg });
    } else {
      res.send({ status: false, message: result.msg });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, message: error.msg });
  }
};

module.exports = { createUserControllerFn, loginUserControllerFn };
