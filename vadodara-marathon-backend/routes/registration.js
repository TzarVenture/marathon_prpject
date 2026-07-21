const express = require("express");
const router = express.Router();
const Registration = require("../models/registration");
const { val_login } = require("../validation/fieldValidation");

/**
 * @swagger
 * /api/registration:
 *   post:
 *     summary: Register for an event
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: string
 *               tshirtSize:
 *                 type: string
 *               emergencyContact:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registration initiated successfully
 *       400:
 *         description: Already registered
 */
// Register for an event
router.post("/", val_login, async (req, res) => {
    try {
        const { eventId, tshirtSize, emergencyContact } = req.body;
        
        // Check if already registered
        const existing = await Registration.findOne({ userId: req.user._id, eventId });
        if (existing) {
            return res.status(400).json({ message: "You are already registered for this event." });
        }

        const registration = new Registration({
            userId: req.user._id,
            eventId,
            tshirtSize,
            emergencyContact
        });

        await registration.save();
        res.status(201).json({ message: "Registration initiated successfully.", registration });
    } catch (error) {
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
});

/**
 * @swagger
 * /api/registration/my-registrations:
 *   get:
 *     summary: Get user's registrations
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Fetched successfully
 */
// Get user registrations
router.get("/my-registrations", val_login, async (req, res) => {
    try {
        const registrations = await Registration.find({ userId: req.user._id }).populate("eventId");
        res.status(200).json({ message: "Fetched successfully.", registrations });
    } catch (error) {
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
});

module.exports = router;
