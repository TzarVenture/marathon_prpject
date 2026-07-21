const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
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
    paymentStatus: {
        type: String,
        enum: ["PENDING", "COMPLETED", "FAILED"],
        default: "PENDING"
    },
    bibNumber: {
        type: String,
        default: ""
    },
    tshirtSize: {
        type: String,
        default: ""
    },
    emergencyContact: {
        type: String,
        default: ""
    }
}, { timestamps: true });

module.exports = mongoose.model("Registration", registrationSchema);
