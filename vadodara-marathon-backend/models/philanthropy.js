const mongoose=require("mongoose")
const philantropySchema=new mongoose.Schema({
    philantropyType:{
        type:String,
        required:true
    },
    philantropyContent:{
        type:String,
        required:true
    },
    philantropySlug:{
        type:String,
        required:true
    }
},{timestamps:true})
module.exports=mongoose.model("philantropy",philantropySchema)