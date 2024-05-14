const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trainer", // Assuming there's a Trainer model
    required: true,
  },
});

const Package1 = mongoose.model("Package", packageSchema);

module.exports = Package1;
