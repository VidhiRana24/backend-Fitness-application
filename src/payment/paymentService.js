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
}

module.exports = PaymentService;
