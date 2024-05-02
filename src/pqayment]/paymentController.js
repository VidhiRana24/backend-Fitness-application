// paymentController.js

const PaymentService = require("./paymentService");
const jwt = require("jsonwebtoken");

const { Request, Response } = require("express");

const createPaymentControllerFn = async (req, res) => {
  try {
    // Call the createPayment method from the PaymentService
    const payment = await new PaymentService().createPayment(req.body);

    // Send success response
    res.status(201).json({
      status: true,
      message: "Payment created successfully",
      payment: payment,
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

    // Create an instance of PaymentService
    const paymentService = new PaymentService();

    // Call the getPaymentById method from the PaymentService
    const payment = await paymentService.getPaymentById(paymentId);

    if (!payment) {
      return res
        .status(404)
        .json({ status: false, message: "Payment not found" });
    }

    // Update payment status
    const updatedPayment = await paymentService.updatePaymentStatus(
      paymentId,
      newStatus
    );

    // Send success response with updated payment data
    res.status(200).json({ status: true, payment: updatedPayment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};
module.exports = {
  createPaymentControllerFn,
  getPaymentByIdControllerFn,
  updatePaymentStatusControllerFn,
};
