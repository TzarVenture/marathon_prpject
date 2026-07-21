const mongoose=require("mongoose")
const vmeditionsSchema=new mongoose.Schema({
    vmeditionsType:{
        type:String,
        required:true
    },
    vmeditionsContent:{
        type:String,
        required:true
    },
    vmeditionsSlug:{
        type:String,
        required:true
    }
},{timestamps:true})
module.exports=mongoose.model("vmeditions",vmeditionsSchema)