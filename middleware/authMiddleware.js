const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
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
        // console.log("Token verification failed:", err.message);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }
      req.userId = decoded.userId;
      console.log("Token verified successfully");
      next();
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = verifyToken;
