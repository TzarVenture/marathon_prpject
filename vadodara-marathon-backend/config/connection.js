const mongoose=require("mongoose")
const connectDB=async()=>{
    try {
        mongoose.connect(process.env.DATABASE)
        console.log("MONGODB CONNECTION SUCCESSFULL")
    } catch (error) {
        console.log("connection failed!!")
        
    }
}
module.exports=connectDB