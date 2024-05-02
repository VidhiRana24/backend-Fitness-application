// paymentService.js

const Payment = require("./paymentModel");

class PaymentService {
  async createPayment(paymentData) {
    try {
      // Create a new payment instance using the provided data
      const newPayment = new Payment(paymentData);
      // Save the new payment to the database
      const savedPayment = await newPayment.save();
      return savedPayment;
    } catch (error) {
      // Handle errors
      throw new Error("Error creating payment");
    }
  }

  async getPaymentById(paymentId) {
    try {
      // Find the payment by its ID in the database
      const payment = await Payment.findById(paymentId);
      return payment;
    } catch (error) {
      // Handle errors
      throw new Error("Error retrieving payment by ID");
    }
  }

  // Add more methods as needed, such as updating payments, deleting payments, etc.
  async updatePaymentStatus(paymentId, newStatus) {
    try {
      // Trim leading and trailing whitespace from the paymentId
      paymentId = paymentId.trim();

      // Find the payment by its ID and update its status
      const updatedPayment = await Payment.findByIdAndUpdate(
        paymentId,
        newStatus,
        { new: true }
      );

      if (!updatedPayment) {
        throw new Error("Payment not found");
      }

      return updatedPayment;
    } catch (error) {
      // Handle errors
      throw new Error("Error updating payment status: " + error.message);
    }
  }
}

module.exports = PaymentService;
