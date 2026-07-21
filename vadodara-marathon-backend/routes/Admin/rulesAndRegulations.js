const express = require("express");
const router = express.Router();
const RuleAndRegulation = require("../../models/ruleAndRegulation");
const { val_login, val_user_is_admin } = require("../../validation/fieldValidation");

/**
 * @swagger
 * /api/rules-and-regulations:
 *   get:
 *     summary: Get rules and regulations data
 *     responses:
 *       200:
 *         description: Fetched successfully
 */
// Get the rules and regulations data (Public access for frontend)
router.get("/", async (req, res) => {
    try {
        const data = await RuleAndRegulation.findOne();
        if (!data) {
            return res.status(200).json({ data: { tableData: [], accordionData: [] } });
        }
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

/**
 * @swagger
 * /api/rules-and-regulations:
 *   put:
 *     summary: Update rules and regulations data
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tableData:
 *                 type: array
 *                 items:
 *                   type: object
 *               accordionData:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       200:
 *         description: Updated successfully
 */
// Update the rules and regulations data (Admin only)
router.put("/", val_login, val_user_is_admin, async (req, res) => {
    try {
        const { tableData, accordionData } = req.body;
        
        let updateData = {};
        if (tableData) updateData.tableData = tableData;
        if (accordionData) updateData.accordionData = accordionData;

        // Use findOneAndUpdate with upsert to create if it doesn't exist
        const data = await RuleAndRegulation.findOneAndUpdate({}, updateData, { new: true, upsert: true });
        res.status(200).json({ message: "Rules and Regulations updated successfully", data });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

module.exports = router;
