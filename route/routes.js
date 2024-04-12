const express = require("express");
const router = express.Router();
const userController = require("../src/user/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.route("/user/login").post(userController.loginUserControllerFn);
router.route("/user/create").post(userController.createUserControllerFn);

// Example of a protected route
router.route("/protected").get(authMiddleware, (req, res) => {
  res.send({ message: "Protected route accessed successfully" });
});

module.exports = router;
