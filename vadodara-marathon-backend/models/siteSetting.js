const mongoose = require("mongoose");

const siteSettingSchema = new mongoose.Schema({
    logoUrl: {
        type: String,
        default: ""
    },
    headerText: {
        type: String,
        default: "Vadodara Marathon"
    },
    title: {
        type: String,
        default: "Vadodara Marathon - Home"
    },
    faviconUrl: {
        type: String,
        default: ""
    }
}, { timestamps: true });

module.exports = mongoose.model("SiteSetting", siteSettingSchema);
