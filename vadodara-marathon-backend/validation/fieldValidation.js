const jwt = require("jsonwebtoken")
const userSchema = require("../models/user")

exports.val_register_user = async (req, res, next) => {
    try {
        const { fname, lname, phone_number, email, dob, gender, password, confirm_password } = req.body;

        if (!fname || !lname || !phone_number || !email || !dob || !gender || !password || !confirm_password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const check_email_exist=await userSchema.findOne({email:email})
        if(check_email_exist){
            return res.status(409).json({message: "User already exists with this email."})
        }

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        if (password !== confirm_password) {
            return res.status(400).json({ message: "Passwords do not match." });
        }

        // Add more validations as needed

        next();
    } catch (error) {
        return res.status(422).json({ message: "Something went wrong, try later." });
    }
}

exports.val_login = async (req, res, next) => {
    try {
        let token = null;

        // Check common places for token
        if (req.headers && req.headers.authorization) {
            // Handle Bearer token format
            if (req.headers.authorization.startsWith("Bearer ")) {
                token = req.headers.authorization.split(" ")[1];
            } else {
                token = req.headers.authorization;
            }
        } else if (req.headers && req.headers.token) {
            token = req.headers.token;
        } else if (req.header("auth-token")) {
            token = req.header("auth-token");
        } else if (req.body && req.body.token) {
            token = req.body.token;
        } else if (req.params && req.params.token) {
            token = req.params.token;
        }

        if (!token) {
            return res.status(400).json({ message: "Token not found" });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        if (!verified) {
            return res.status(400).json({ message: "Invalid token." });
        }

        req.user = verified;

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong, try later.", error: error });
    }
}

exports.val_user_is_admin = async (req, res, next) => {
    try {
        const userID = req.user._id;
        const user = await userSchema.findById(userID)

        if (!user) {
            return res.status(400).json({ message: "User not found." })
        }
        // console.log(user);

        if (user.role !== "ADMIN") {
            return res.status(403).json({ message: "Access denied. You are not an admin" })
        }
        next()
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong, try later.", error: error.message })
    }
}


exports.val_user_is_USER = async (req, res, next) => {
    try {
        const userID = req.user._id;
        const user = await userSchema.findById(userID)

        if (!user) {
            return res.status(400).json({ message: "User not found." })
        }

        if (user.role !== "USER") {
            return res.status(403).json({ message: "Access denied. You are not a USER" })
        }
        next()
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong, try later.", error: error })
    }
}


exports.val_user_is_SPONSOR = async (req, res, next) => {
    try {
        const userID = req.user._id;
        const user = await userSchema.findById(userID)

        if (!user) {
            return res.status(400).json({ message: "User not found." })
        }

        if (user.role !== "SPONSOR") {
            return res.status(403).json({ message: "Access denied. You are not a SPONSOR" })
        }
        next()
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong, try later.", error: error })
    }
}


exports.val_contact=async(req,res,next)=>{
    try {
        const {fname,lname,phone,email,feedback}=req.body
        if(!fname || !lname || !phone || !email || !feedback){
            return res.status(400).json({message:"All fields are required."})
        }
        next()
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong, try later.", error: error })
    }
}
