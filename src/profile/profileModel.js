const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user document
  name: { type: String, required: true },
  surname: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  imageUrl: { type: String }, // Assuming you're storing the URL of the uploaded image
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;
