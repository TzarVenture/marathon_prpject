const mongoose=require("mongoose")
const knowusSchema=new mongoose.Schema({
    knowusType:{
        type:String,
        required:true
    },
    knowusContent:{
        type:String,
        required:true
    },
    knowusSlug:{
        type:String,
        required:true
    }
},{timestamps:true})


module.exports=mongoose.model("knowus",knowusSchema)