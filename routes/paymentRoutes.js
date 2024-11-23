
const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Payment routes
router.post("/create", paymentController.createPayment);
router.get("/success", paymentController.executePayment);
router.get("/cancel", paymentController.cancelPayment);

module.exports = router;
