const mongoose = require("mongoose")
const partnerSchema = new mongoose.Schema({
    partner_name: {
        type: String,
        required: true
    },
    partner_website_url: {
        type: String,
        required: true
    },
    partner_img_url:{
        type:String,
        required:true
    },
    partner_img_filename:{
        type:String,
        required:true
    },

})

module.exports=mongoose.model("partners",partnerSchema)