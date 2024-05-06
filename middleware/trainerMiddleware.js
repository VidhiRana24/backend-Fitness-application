const jwt = require("jsonwebtoken");

const verifyTrainerToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("Token not provided");
      return res
        .status(401)
        .json({ message: "Unauthorized: Token not provided" });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, "MY_PROJECT", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }

      // Check if the user is a trainer based on some criteria (e.g., a property in the user profile)
      if (!decoded.isTrainer) {
        return res.status(403).json({ message: "Forbidden: Not a trainer" });
      }

      // Attach decoded user ID to the request object
      req.trainerId = decoded.userId;

      console.log("Trainer token verified successfully");
      next();
    });
  } catch (error) {
    console.error("Error verifying trainer token:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = verifyTrainerToken;
