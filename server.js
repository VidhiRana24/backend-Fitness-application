const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./route/routes");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
app.listen(3001, function check(error) {
  if (error) console.log("Error:", error);
  else console.log("Server started on port 3001");
});

mongoose
  .connect("mongodb://localhost:27017/Gym-Application")
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Corrected usage of express.json()
app.use(express.json());

app.use(routes);
