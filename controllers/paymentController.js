
const paypal = require("../config/paypal");

// Create a payment
exports.createPayment = (req, res) => {
  const { total, currency, description } = req.body;

  const paymentDetails = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:3000/api/payments/success",
      cancel_url: "http://localhost:3000/api/payments/cancel",
    },
    transactions: [
      {
        amount: {
          total: total || "10.00",
          currency: currency || "USD",
        },
        description: description || "Payment description.",
      },
    ],
  };

  paypal.payment.create(paymentDetails, (error, payment) => {
    if (error) {
      console.error("Error creating payment:", error);
      res.status(500).json({ success: false, message: "Payment creation failed." });
    } else {
      const approvalUrl = payment.links.find((link) => link.rel === "approval_url");
      res.status(200).json({ success: true, approvalUrl: approvalUrl?.href });
    }
  });
};

// Execute payment after approval
exports.executePayment = (req, res) => {
  const { paymentId, PayerID } = req.query;

  const executePaymentJson = {
    payer_id: PayerID,
  };

  paypal.payment.execute(paymentId, executePaymentJson, (error, payment) => {
    if (error) {
      console.error("Error executing payment:", error.response);
      res.status(500).json({ success: false, message: "Payment execution failed." });
    } else {
      res.status(200).json({ success: true, paymentDetails: payment });
    }
  });
};

// Cancel payment
exports.cancelPayment = (req, res) => {
  res.status(200).json({ success: false, message: "Payment canceled by user." });
};
