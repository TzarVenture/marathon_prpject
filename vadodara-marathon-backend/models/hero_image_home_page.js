const mongoose = require("mongoose")
const hero_image_schema = new mongoose.Schema({
    hero_image_file_url: {
        type: String,
        required: true
    },
    hero_img_filename:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("Hero image", hero_image_schema)