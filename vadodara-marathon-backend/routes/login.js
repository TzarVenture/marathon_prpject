const express=require("express")
const router=express.Router()
const userSchema=require("../models/user")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login success
 */

router.post("/",async(req,res)=>{
    try {
        const {email,password}=req.body;
        const check_email_exist=await userSchema.findOne({email:email})
        if(!check_email_exist){
            return res.status(409).json({message:"Invalid email."})
        }

        if (!check_email_exist.isEmailVerified || !check_email_exist.isPhoneVerified) {
            return res.status(403).json({ message: "Please verify your email and phone before logging in." });
        }


        //compare hashed password with login password
        const validPass=await bcrypt.compare(password,check_email_exist.password)
        if(!validPass){
            return res.status(401).json({message:"Invalid password"})
        }

        //create token
        const token=jwt.sign(
            {_id:check_email_exist._id},
            process.env.JWT_SECRET,
            {
                algorithm:"HS256",
                expiresIn:"7d"
            }
        )

        // setcookie 
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:true
        })

        // set header 
        res.setHeader("auth-token",token)
        return res.status(200).json({message:"User logged in successfully",token:token})
    } catch (error) {
        return res.status(501).json({message:"Internal server error",error:error})
    }
})

module.exports=router