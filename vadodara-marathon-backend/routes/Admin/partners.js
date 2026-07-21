const express = require("express")
const router = express.Router()
const partnerschema = require("../../models/partners")
const { val_register_user, val_login, val_user_is_admin } = require("../../validation/fieldValidation")


const multer = require("multer")
const path = require("path")

// configure storage engine and filename 
const storage = multer.diskStorage({
    destination: "./partners/",
    filename: function (req, file, cb) {
        // console.log(file.filename)
        cb(null, file.filename + "-" + Date.now() + path.extname(file.originalname))
    }
})


// validation for filetype and use it where initializing multer upload middleware 
function checkFileType(file, cb) {
    const fileType = /jpeg|jpg|png|gif/;
    const extname = fileType.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileType.test(file.mimetype);

    if (mimeType && extname) {
        return cb(null, true)
    } else {
        cb("Error:Images only !(jpeg, jpg, png, gif)")
    }
}

// initialize upload middleware and add file size limit 
const upload = multer({
    storage: storage,
    limits: { fileSize: 3000000 },// 3MB file size limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb) //validation function for middleware
    }
}).single('partner_img_filename'); // 'file_name' is the name attribute of the file input field


/**
 * @swagger
 * /api/partners:
 *   post:
 *     summary: Upload partner
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               partner_name:
 *                 type: string
 *               partner_website_url:
 *                 type: string
 *               partner_img_filename:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Uploaded successfully
 */
router.post("/", val_login, val_user_is_admin, async (req, res) => {
    try {
        upload(req, res, async (err) => {
            const { partner_name, partner_website_url } = req.body;
            // console.log(partner_name)
            if (err) {
                // console.log(err);
                return res.status(500).json({ error: err })
            }
            if (!req.file) {
                return res.status(400).json({ message: "Please send file." })
            }

            const file_name_of_doc = req.file.filename;

            const save_img_data = new partnerschema({
                partner_name: partner_name,
                partner_website_url: partner_website_url,
                partner_img_filename: file_name_of_doc,
                partner_img_url: req.protocol + "://" + req.get("host") + "/" + file_name_of_doc,
            })

            await save_img_data.save()
            return res.status(200).json({ message: "Partner uploaded successfully" })
        })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message })
    }
})


/**
 * @swagger
 * /api/partners/fetch-all:
 *   get:
 *     summary: Fetch all partners
 *     responses:
 *       200:
 *         description: Fetched successfully
 */
router.get("/fetch-all", async (req, res) => {
    try {
        const find_all_category = await partnerschema.find();
        return res.status(200).json({ message: "Partners fetched successfully.", data: find_all_category })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error })
    }
})

/**
 * @swagger
 * /api/partners/fetch-by-id/{id}:
 *   get:
 *     summary: Fetch partner by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetched successfully
 */
router.get("/fetch-by-id/:id", val_login, val_user_is_admin, async (req, res) => {
    try {
        const id = req.params.id;
        const race_category = await partnerschema.findById(id)
        return res.status(200).json({ message: "Particular partner fetched successfully.", data: race_category })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error })
    }
})



/**
 * @swagger
 * /api/partners/update/{id}:
 *   put:
 *     summary: Update partner
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               partner_name:
 *                 type: string
 *               partner_website_url:
 *                 type: string
 *               partner_img_filename:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.put("/update/:id", val_login, val_user_is_admin, async (req, res) => {
    try {
        const id = req.params.id;

        // If you want to allow updating the image, handle file upload
        upload(req, res, async (err) => {
            const { partner_name, partner_website_url } = req.body;
            if (err) {
                return res.status(500).json({ error: err });
            }

            // Prepare update object
            const updateData = { partner_name, partner_website_url };

            if (req.file) {
                updateData.sponsor_img_filename = req.file.filename;
                updateData.sponsor_img_url = req.protocol + "://" + req.get("host") + "/" + req.file.filename;
            }

            const updatedCategory = await partnerschema.findByIdAndUpdate(
                id,
                updateData,
                { new: true, runValidators: true }
            );

            if (!updatedCategory) {
                return res.status(404).json({ message: "Partner not found." });
            }

            return res.status(200).json({ message: "Partner updated successfully.", data: updatedCategory });
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
});



/**
 * @swagger
 * /api/partners/delete/{id}:
 *   delete:
 *     summary: Delete partner
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.delete("/delete/:id", val_login, val_user_is_admin, async (req, res) => {
    try {
        const id = req.params.id;
        const find_and_delete = await partnerschema.findByIdAndDelete(id)
        return res.status(200).json({ message: "Partner deleted successfully.", data: find_and_delete })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error })
    }
})






module.exports = router;
