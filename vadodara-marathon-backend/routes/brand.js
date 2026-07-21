const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Registration = require("../models/registration");
const { val_login } = require("../validation/fieldValidation");
const sendMail = require("../utils/sendMail");
const { createObjectCsvStringifier } = require('csv-writer');

const val_user_is_brand = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user || user.role !== "BRAND") {
            return res.status(403).json({ message: "Access denied. You are not a BRAND" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

/**
 * @swagger
 * /api/brand/participants:
 *   get:
 *     summary: Get all participants (Brand only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Fetched successfully
 */
// Get all participants
router.get("/participants", val_login, val_user_is_brand, async (req, res) => {
    try {
        // Fetch only participants (USER, INFLUENCER)
        const participants = await User.find({ role: { $in: ["USER", "INFLUENCER"] } })
                                      .select("fname lname email phone_number location");
        res.status(200).json({ data: participants });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

/**
 * @swagger
 * /api/brand/participants/csv:
 *   get:
 *     summary: Download CSV of participants (Brand only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: CSV downloaded successfully
 */
// Download CSV of participants
router.get("/participants/csv", val_login, val_user_is_brand, async (req, res) => {
    try {
        const participants = await User.find({ role: { $in: ["USER", "INFLUENCER"] } })
                                      .select("fname lname email phone_number location");
        
        const csvStringifier = createObjectCsvStringifier({
            header: [
                { id: 'name', title: 'Name' },
                { id: 'email', title: 'Email' },
                { id: 'phone', title: 'Phone' },
                { id: 'location', title: 'Location' }
            ]
        });
        
        const records = participants.map(p => ({
            name: `${p.fname} ${p.lname}`,
            email: p.email,
            phone: p.phone_number,
            location: `${p.location.city}, ${p.location.state}`
        }));
        
        const csv = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records);
        
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=\"participants.csv\"');
        res.status(200).send(csv);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

/**
 * @swagger
 * /api/brand/send-promo:
 *   post:
 *     summary: Send promotional email (Brand only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Promotional emails sent successfully
 */
// Send promotional email
router.post("/send-promo", val_login, val_user_is_brand, async (req, res) => {
    try {
        const { subject, message } = req.body;
        const participants = await User.find({ role: { $in: ["USER", "INFLUENCER"] } }).select("email");
        
        const emails = participants.map(p => p.email);
        if (emails.length > 0) {
            await sendMail(emails.join(","), subject, message, `<p>${message}</p>`);
        }
        
        res.status(200).json({ message: "Promotional emails sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
