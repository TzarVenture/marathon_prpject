const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
    razorpayOrderId: {
        type: String,
        required: true
    },
    razorpayPaymentId: {
        type: String,
        default: null
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["CREATED", "SUCCESS", "FAILED"],
        default: "CREATED"
    },
    invoiceUrl: {
        type: String,
        default: ""
    }
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
