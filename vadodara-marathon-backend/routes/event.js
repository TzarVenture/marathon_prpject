const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const { val_login, val_user_is_admin } = require("../validation/fieldValidation");
const upload = require("../utils/upload");

/**
 * @swagger
 * /api/event:
 *   post:
 *     summary: Create an event (Admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               date:
 *                 type: string
 *               location:
 *                 type: string
 *               distance:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               coverImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Event created successfully
 */
// Create Event (Admin Only)
router.post("/", val_login, val_user_is_admin, upload.single("coverImage"), async (req, res) => {
    try {
        const { title, date, location, distance, price, description } = req.body;
        const coverImage = req.file ? `/uploads/${req.file.filename}` : "";

        const newEvent = new Event({
            title, date, location, distance, price, description, coverImage,
            createdBy: req.user._id
        });

        await newEvent.save();
        res.status(201).json({ message: "Event created successfully.", event: newEvent });
    } catch (error) {
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
});

/**
 * @swagger
 * /api/event:
 *   get:
 *     summary: Get all active events
 *     responses:
 *       200:
 *         description: Events fetched successfully
 */
// Get All Events (Public)
router.get("/", async (req, res) => {
    try {
        const events = await Event.find({ isActive: true }).sort({ date: 1 });
        res.status(200).json({ message: "Events fetched successfully.", events });
    } catch (error) {
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
});

/**
 * @swagger
 * /api/event/{id}:
 *   get:
 *     summary: Get event by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event fetched successfully
 *       404:
 *         description: Event not found
 */
// Get Event By ID
router.get("/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.status(200).json({ message: "Event fetched successfully", event });
    } catch (error) {
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
});

module.exports = router;
