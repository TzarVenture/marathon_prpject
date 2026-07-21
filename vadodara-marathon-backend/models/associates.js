const mongoose = require("mongoose")
const associateSchema = new mongoose.Schema({
    associate_name: {
        type: String,
        required: true
    },
    associate_website_url: {
        type: String,
        required: true
    },
    associate_img_url:{
        type:String,
        required:true
    },
    associate_img_filename:{
        type:String,
        required:true
    },

})

module.exports=mongoose.model("associates",associateSchema)