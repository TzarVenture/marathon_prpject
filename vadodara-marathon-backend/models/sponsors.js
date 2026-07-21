const mongoose = require("mongoose")
const sponsorSchema = new mongoose.Schema({
    sponsor_name: {
        type: String,
        required: true
    },
    sponsor_website_url: {
        type: String,
        required: true
    },
    sponsor_img_url:{
        type:String,
        required:true
    },
    sponsor_img_filename:{
        type:String,
        required:true
    },

})

module.exports=mongoose.model("sponsors",sponsorSchema)