const PaymentService = require("./paymentService");
const verifyToken = require("../../middleware/authMiddleware");

const { Request, Response } = require("express");

const createPaymentControllerFn = async (req, res) => {
  try {
    // Verify user token
    verifyToken(req, res, async () => {
      // Extract user ID from decoded token
      const userId = req.userId;

      // Call the createPayment method from the PaymentService
      const payment = await new PaymentService().createPayment({
        ...req.body,
        createdBy: userId, // Associate payment with the user
      });

      // Send success response
      res.status(201).json({
        status: true,
        message: "Payment created successfully",
        payment: payment,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

const getPaymentByIdControllerFn = async (req, res) => {
  try {
    const { paymentId } = req.params;

    // Call the getPaymentById method from the PaymentService
    const payment = await new PaymentService().getPaymentById(paymentId);

    if (!payment) {
      return res
        .status(404)
        .json({ status: false, message: "Payment not found" });
    }

    // Send success response with payment data
    res.status(200).json({ status: true, payment: payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

const updatePaymentStatusControllerFn = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const newStatus = req.body;

    // Verify user token
    verifyToken(req, res, async () => {
      // Call the updatePaymentStatus method from the PaymentService
      const updatedPayment = await new PaymentService().updatePaymentStatus(
        paymentId,
        newStatus
      );

      // Send success response with updated payment data
      res.status(200).json({ status: true, payment: updatedPayment });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// Add similar logic for deletePaymentControllerFn

module.exports = {
  createPaymentControllerFn,
  getPaymentByIdControllerFn,
  updatePaymentStatusControllerFn,
};
