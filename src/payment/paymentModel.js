const mongoose = require("mongoose");

// Define payment schema fields
const paymentSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    // You can add more fields as needed
  },
  { timestamps: true }
); // Add timestamps for createdAt and updatedAt

// Create Payment model
const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
