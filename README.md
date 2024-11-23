
# Payment API Endpoints

## API Endpoints

This section describes the API endpoints available for handling payments using PayPal in the Node.js application.

---

### 1. POST `/api/payments/create`

#### Purpose:  
Creates a payment session with PayPal and returns an approval URL.

#### Request Body Example:  
```json
{
  "total": "20.00",
  "currency": "USD",
  "description": "Order #1234"
}
```

- **Parameters**:
  - `total` (string): The total amount for the payment (e.g., "20.00").
  - `currency` (string): The currency for the payment (e.g., "USD").
  - `description` (string): A description of the payment (e.g., "Order #1234").

#### Response Example:  
```json
{
  "success": true,
  "approvalUrl": "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-XXXXXX"
}
```

- **Key Response Fields**:
  - `success` (boolean): Indicates if the operation was successful.
  - `approvalUrl` (string): The URL to redirect the user for payment approval.

---

### 2. GET `/api/payments/success`

#### Purpose:  
Finalizes the payment process after the user approves the payment.

#### Query Parameters:  
- `paymentId` (string): The PayPal payment ID returned in the redirect URL after user approval.  
- `PayerID` (string): The PayPal payer ID returned in the redirect URL after user approval.

#### Response Example:  
```json
{
  "success": true,
  "paymentDetails": {
    "id": "PAY-XXXXXX",
    "state": "approved",
    "transactions": [ ... ],
    "create_time": "2024-11-23T12:00:00Z"
  }
}
```

- **Key Response Fields**:
  - `success` (boolean): Indicates if the operation was successful.
  - `paymentDetails` (object): Contains details of the completed payment.

---

### 3. GET `/api/payments/cancel`

#### Purpose:  
Handles the case when a user cancels the payment process.

#### Response Example:  
```json
{
  "success": false,
  "message": "Payment canceled by user."
}
```

- **Key Response Fields**:
  - `success` (boolean): Indicates that the payment was not completed.
  - `message` (string): Provides the reason or status of cancellation.

---

### How They Work Together
1. **`POST /api/payments/create`**: Start the payment and obtain an approval URL.
2. **`GET /api/payments/success`**: Finalize the payment after approval.
3. **`GET /api/payments/cancel`**: Handle user cancellation.

---
