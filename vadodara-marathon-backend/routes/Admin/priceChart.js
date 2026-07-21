const express = require("express");
const router = express.Router();
const PriceChart = require("../../models/priceChart");
const { val_login, val_user_is_admin } = require("../../validation/fieldValidation");

/**
 * @swagger
 * /api/price-chart:
 *   get:
 *     summary: Get price chart data
 *     responses:
 *       200:
 *         description: Fetched successfully
 */
// Get the price chart data (Public access for frontend)
router.get("/", async (req, res) => {
    try {
        const data = await PriceChart.findOne();
        if (!data) {
            return res.status(200).json({ data: { tableData: [] } });
        }
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

/**
 * @swagger
 * /api/price-chart:
 *   put:
 *     summary: Update price chart data
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
 *     responses:
 *       200:
 *         description: Updated successfully
 */
// Update the price chart data (Admin only)
router.put("/", val_login, val_user_is_admin, async (req, res) => {
    try {
        const { tableData } = req.body;
        
        let updateData = {};
        if (tableData) updateData.tableData = tableData;

        // Use findOneAndUpdate with upsert to create if it doesn't exist
        const data = await PriceChart.findOneAndUpdate({}, updateData, { new: true, upsert: true });
        res.status(200).json({ message: "Price Chart updated successfully", data });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

module.exports = router;
