const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        default: ""
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
