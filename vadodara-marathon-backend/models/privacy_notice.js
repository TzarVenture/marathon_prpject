const mongoose = require("mongoose")
const privacy_noticeSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    type:{
        type:String,
        required:true
    }
}, { timestamps: true })

module.exports=mongoose.model("privacy_notice",privacy_noticeSchema)