const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  mobileNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Convert input to string to ensure leading zeros are preserved
        const mobileNumberStr = String(v);
        // Check if the input consists of exactly 10 digits
        return /^\d{10}$/.test(mobileNumberStr) && !isNaN(mobileNumberStr);
      },
      message: (props) =>
        `${props.value} is not a valid mobile number! Please provide a 10-digit number.`,
    },
  },

  country: { type: String, required: true },
  state: { type: String, required: true },
  imageUrl: { type: String },
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;
