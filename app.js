
const express = require("express");
const bodyParser = require("body-parser");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/payments", paymentRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
