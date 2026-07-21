const mongoose = require("mongoose");

const ruleAndRegulationSchema = new mongoose.Schema({
    tableData: [{
        srNo: { type: String },
        event: { type: String },
        cutOff: { type: String },
        subCategories: [{
            category: { type: String },
            participants: { type: String },
            ageGroup: { type: String }
        }]
    }],
    accordionData: [{
        title: { type: String },
        content: { type: String }
    }]
}, { timestamps: true });

module.exports = mongoose.model("RuleAndRegulation", ruleAndRegulationSchema);
