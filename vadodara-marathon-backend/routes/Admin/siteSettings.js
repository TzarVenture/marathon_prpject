const express = require("express");
const router = express.Router();
const SiteSetting = require("../../models/siteSetting");
const { val_login, val_user_is_admin } = require("../../validation/fieldValidation");
const upload = require("../../utils/upload");

/**
 * @swagger
 * /api/site-settings:
 *   get:
 *     summary: Get site settings
 *     responses:
 *       200:
 *         description: Fetched successfully
 */
// Get settings (public)
router.get("/", async (req, res) => {
    try {
        const settings = await SiteSetting.findOne();
        if (!settings) {
            return res.status(200).json({ data: {} });
        }
        res.status(200).json({ data: settings });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

/**
 * @swagger
 * /api/site-settings:
 *   put:
 *     summary: Update site settings
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               headerText:
 *                 type: string
 *               title:
 *                 type: string
 *               logo:
 *                 type: string
 *                 format: binary
 *               favicon:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Updated successfully
 */
// Update settings (Admin)
router.put("/", val_login, val_user_is_admin, upload.fields([{ name: "logo" }, { name: "favicon" }]), async (req, res) => {
    try {
        const { headerText, title } = req.body;
        let updateData = { headerText, title };

        if (req.files && req.files["logo"]) {
            updateData.logoUrl = `/uploads/${req.files["logo"][0].filename}`;
        }
        if (req.files && req.files["favicon"]) {
            updateData.faviconUrl = `/uploads/${req.files["favicon"][0].filename}`;
        }

        const settings = await SiteSetting.findOneAndUpdate({}, updateData, { new: true, upsert: true });
        res.status(200).json({ message: "Settings updated successfully", data: settings });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

module.exports = router;
