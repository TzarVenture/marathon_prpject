const express = require("express")
const router = express.Router()
const userSchema = require("../models/user")
const Otp = require("../models/otp")
const sendMail = require("../utils/sendMail")
const { val_register_user, val_login, val_user_is_admin } = require("../validation/fieldValidation")
const bcrypt = require("bcryptjs")

// Generate random 6 digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fname:
 *                 type: string
 *               lname:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               email:
 *                 type: string
 *               dob:
 *                 type: string
 *               gender:
 *                 type: string
 *               password:
 *                 type: string
 *               confirm_password:
 *                 type: string
 *               role:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       409:
 *         description: User already exists
 */
router.post("/", val_register_user, async (req, res) => {
    try {
        const { fname, lname, phone_number, email, dob, gender, password, confirm_password, role, city, state } = req.body;

        // Check if user already exists
        const existingUser = await userSchema.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists with this email." });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new userSchema({
            fname,
            lname,
            phone_number,
            email,
            dob,
            gender,
            password: hashedPassword,
            confirm_password,
            role,
            location: { city: city || "", state: state || "" }
        });

        await newUser.save();

        // Generate OTPs
        const emailOtp = generateOTP();
        const phoneOtp = generateOTP(); // Simulated phone OTP

        const otpRecord = new Otp({
            userId: newUser._id,
            emailOtp,
            phoneOtp
        });
        await otpRecord.save();

        // Send Email OTP
        try {
            await sendMail(
                email, 
                "Vadodara Marathon - Email Verification", 
                `Your email verification OTP is ${emailOtp}`, 
                `<p>Your email verification OTP is <strong>${emailOtp}</strong></p>`
            );
        } catch(err) {
            console.error("Failed to send email", err);
        }

        return res.status(201).json({ 
            message: "User registered successfully. Please verify your email and phone.",
            userId: newUser._id 
        });
    } catch (error) {
        return res.status(501).json({ message: "Internal server error.", error: error.message });
    }
});

/**
 * @swagger
 * /api/register/verify-email:
 *   post:
 *     summary: Verify email using OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid OTP
 */
// Verify Email Route
router.post("/verify-email", async (req, res) => {
    try {
        const { userId, otp } = req.body;
        const otpRecord = await Otp.findOne({ userId });
        
        if (!otpRecord) return res.status(400).json({ message: "OTP expired or not found." });
        if (otpRecord.emailOtp !== otp) return res.status(400).json({ message: "Invalid email OTP." });

        await userSchema.findByIdAndUpdate(userId, { isEmailVerified: true });
        otpRecord.emailOtp = null;
        await otpRecord.save();

        return res.status(200).json({ message: "Email verified successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Server error." });
    }
});

/**
 * @swagger
 * /api/register/verify-phone:
 *   post:
 *     summary: Verify phone using OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Phone verified successfully
 *       400:
 *         description: Invalid OTP
 */
// Verify Phone Route
router.post("/verify-phone", async (req, res) => {
    try {
        const { userId, otp } = req.body;
        const otpRecord = await Otp.findOne({ userId });
        
        if (!otpRecord) return res.status(400).json({ message: "OTP expired or not found." });
        if (otpRecord.phoneOtp !== otp) return res.status(400).json({ message: "Invalid phone OTP." });

        await userSchema.findByIdAndUpdate(userId, { isPhoneVerified: true });
        otpRecord.phoneOtp = null;
        await otpRecord.save();

        return res.status(200).json({ message: "Phone verified successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Server error." });
    }
});

/**
 * @swagger
 * /api/register/fetch-all-user:
 *   get:
 *     summary: Fetch all users (Admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All users fetched successfully
 */
//ONLY ADMIN CAN ACCESS ALL USER
router.get("/fetch-all-user", val_login, val_user_is_admin, async (req, res) => {
    try {
        const get_all_user = await userSchema.find();
        return res.status(200).json({ message: "All users fetched successfully.", data: get_all_user })
    } catch (error) {
        return res.status(501).json({ message: "Internal server error.", data: get_all_user })

    }
})


/**
 * @swagger
 * /api/register/user-profile:
 *   get:
 *     summary: Fetch user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 */
// fetch user profile 
router.get("/user-profile", val_login, async (req, res) => {
    try {
        const userID = req.user._id;
        const user = await userSchema.findById(userID).select({ password: 0, confirm_password: 0 });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        return res.status(200).json({ message: "User profile fetched successfully.", data: user });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error });
    }
})

/**
 * @swagger
 * /api/register/update-profile:
 *   put:
 *     summary: Update user profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fname:
 *                 type: string
 *               lname:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               email:
 *                 type: string
 *               dob:
 *                 type: string
 *               gender:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
//LOGIN USER update profile data 
router.put("/update-profile", val_login, async (req, res) => {
    try {
        const { fname, lname, phone_number, email, dob, gender } = req.body;
        const userID = req.user._id;

        // Find and update user
        const updatedUser = await userSchema.findByIdAndUpdate(
            userID,
            { fname, lname, phone_number, email, dob, gender },
            { new: true, runValidators: true, select: { password: 0, confirm_password: 0 } }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json({ message: "Profile updated successfully.", data: updatedUser });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
})

/**
 * @swagger
 * /api/register/delete-user:
 *   delete:
 *     summary: Delete user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete("/delete-user", val_login, async (req, res) => {
    try {
        const userID = req.user._id;
        const deleteUser = await userSchema.findByIdAndDelete(userID)
        return res.status(200).json({ message: "User deleted successfully." })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." })

    }
})



module.exports = router