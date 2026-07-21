const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    emailOtp: {
        type: String,
        default: null
    },
    phoneOtp: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600 // OTP expires in 10 minutes
    }
});

module.exports = mongoose.model("Otp", otpSchema);
