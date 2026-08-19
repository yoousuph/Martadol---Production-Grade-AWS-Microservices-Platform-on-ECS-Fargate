const Flutterwave = require("flutterwave-node-v3");
// const Razorpay = require('razorpay');
const crypto = require('crypto');

const createOrder = async (req, res) => {
  try {
    const instance = new Flutterwave({
      key_id: process.env.FLW_PUBLIC_KEY,
      key_secret: process.env.FLW_SECRET_KEY,
    });
    
    // Razorpay accepts amount in paise
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
    };
    
    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send("Some error occured");
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { flutterwave_order_id, flutterwave_payment_id, flutterwave_signature } = req.body;
    const sign = flutterwave_order_id + "|" + flutterwave_payment_id;
    const expectedSign = crypto.createHmac("sha256", process.env.FLW_SECRET_KEY)
      .update(sign.toString())
      .digest("hex");

    if (flutterwave_signature === expectedSign) {
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { createOrder, verifyPayment };
