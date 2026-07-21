const mongoose=require("mongoose")
const pastEventsSchema=new mongoose.Schema({
    event_name:{
        type:String,
        required:true
    },
    event_date:{
        type:String,
        required:true
    },
    event_desc:[
        {
            type:String,
            required:true
        }
    ]
},{timestamps:true})

module.exports=mongoose.model("past_events",pastEventsSchema)