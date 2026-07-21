const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/payment");
const Registration = require("../models/registration");
const { val_login } = require("../validation/fieldValidation");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "test_key",
    key_secret: process.env.RAZORPAY_SECRET || "test_secret",
});

/**
 * @swagger
 * /api/payment/create-order:
 *   post:
 *     summary: Create a Razorpay order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Order created successfully
 */
// Create Order
router.post("/create-order", val_login, async (req, res) => {
    try {
        const { eventId, amount } = req.body;

        const options = {
            amount: amount * 100, // amount in smallest currency unit (paise)
            currency: "INR",
            receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
        };

        const order = await razorpay.orders.create(options);

        if (!order) return res.status(500).json({ message: "Error creating order" });

        const payment = new Payment({
            userId: req.user._id,
            eventId,
            razorpayOrderId: order.id,
            amount
        });
        await payment.save();

        res.status(200).json({ message: "Order created successfully", order, paymentId: payment._id });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

/**
 * @swagger
 * /api/payment/verify-payment:
 *   post:
 *     summary: Verify a Razorpay payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               razorpayOrderId:
 *                 type: string
 *               razorpayPaymentId:
 *                 type: string
 *               razorpaySignature:
 *                 type: string
 *               paymentId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *       400:
 *         description: Invalid signature
 */
// Verify Payment
router.post("/verify-payment", async (req, res) => {
    try {
        const { razorpayOrderId, razorpayPaymentId, razorpaySignature, paymentId } = req.body;

        const sign = razorpayOrderId + "|" + razorpayPaymentId;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET || "test_secret")
            .update(sign.toString())
            .digest("hex");

        if (razorpaySignature === expectedSign) {
            await Payment.findByIdAndUpdate(paymentId, { status: "SUCCESS", razorpayPaymentId });
            
            const payment = await Payment.findById(paymentId);
            await Registration.findOneAndUpdate(
                { userId: payment.userId, eventId: payment.eventId },
                { paymentStatus: "COMPLETED", bibNumber: "BIB" + Math.floor(1000 + Math.random() * 9000) }
            );

            return res.status(200).json({ message: "Payment verified successfully" });
        } else {
            await Payment.findByIdAndUpdate(paymentId, { status: "FAILED" });
            return res.status(400).json({ message: "Invalid signature" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

module.exports = router;
