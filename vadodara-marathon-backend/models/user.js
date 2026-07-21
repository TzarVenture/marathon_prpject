const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        default: Date.now
    },
    gender: {
        type: String,
        required: true
    },
    location: {
        city: { type: String, default: "" },
        state: { type: String, default: "" }
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        enum:["USER","ADMIN","SPONSOR","INFLUENCER","BRAND"],
        default:"USER"
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isPhoneVerified: {
        type: Boolean,
        default: false
    },
    profilePic: {
        type: String,
        default: ""
    }
}, { timestamps: true })

module.exports=mongoose.model("Users",userSchema)