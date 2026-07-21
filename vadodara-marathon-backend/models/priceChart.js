const mongoose = require("mongoose");

const priceChartSchema = new mongoose.Schema({
    tableData: [{
        srNo: { type: String },
        event: { type: String },
        cutOff: { type: String },
        subCategories: [{
            category: { type: String },
            participants: { type: String },
            ageGroup: { type: String },
            registrationAmount: { type: String },
            earlyBirdAmount: { type: String }
        }]
    }]
}, { timestamps: true });

module.exports = mongoose.model("PriceChart", priceChartSchema);
