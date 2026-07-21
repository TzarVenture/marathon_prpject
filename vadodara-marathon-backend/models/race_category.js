const mongoose = require("mongoose")
const race_category_schema = new mongoose.Schema({
    race_category_url: {
        type: String,
        required: true
    },
    race_category_filename:{
        type:String,
        required:true
    },
    category_name:{
        type:String,
        required:true,
        uppercase:true
    }
},{timestamps:true})

module.exports = mongoose.model("Race category", race_category_schema)