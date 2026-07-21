const express = require("express")
const router = express.Router()
const associatesSchema = require("../../models/associates")
const { val_register_user, val_login, val_user_is_admin } = require("../../validation/fieldValidation")


const multer = require("multer")
const path = require("path")

// configure storage engine and filename 
const storage = multer.diskStorage({
    destination: "./associates/",
    filename: function (req, file, cb) {
        console.log(file.filename)
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
}).single('associate_img_filename'); // 'file_name' is the name attribute of the file input field


/**
 * @swagger
 * /api/associates:
 *   post:
 *     summary: Upload associate
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               associate_name:
 *                 type: string
 *               associate_website_url:
 *                 type: string
 *               associate_img_filename:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Uploaded successfully
 */
router.post("/", val_login, val_user_is_admin, async (req, res) => {
    try {
        upload(req, res, async (err) => {
            const { associate_name, associate_website_url } = req.body;
            // console.log(associate_name)
            if (err) {
                // console.log(err);
                return res.status(500).json({ error: err })
            }
            if (!req.file) {
                return res.status(400).json({ message: "Please send file." })
            }

            const file_name_of_doc = req.file.filename;

            const save_img_data = new associatesSchema({
                associate_name: associate_name,
                associate_website_url: associate_website_url,
                associate_img_filename: file_name_of_doc,
                associate_img_url: req.protocol + "://" + req.get("host") + "/" + file_name_of_doc,
            })

            await save_img_data.save()
            return res.status(200).json({ message: "Associate added successfully." })
        })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message })
    }
})


/**
 * @swagger
 * /api/associates/fetch-all:
 *   get:
 *     summary: Fetch all associates
 *     responses:
 *       200:
 *         description: Fetched successfully
 */
router.get("/fetch-all", async (req, res) => {
    try {
        const find_all_category = await associatesSchema.find();
        return res.status(200).json({ message: "Associate fetched successfully.", data: find_all_category })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error })
    }
})

/**
 * @swagger
 * /api/associates/fetch-by-id/{id}:
 *   get:
 *     summary: Fetch associate by ID
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
        const race_category = await associatesSchema.findById(id)
        return res.status(200).json({ message: "Particular Associate fetched successfully.", data: race_category })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error })
    }
})

/**
 * @swagger
 * /api/associates/update/{id}:
 *   put:
 *     summary: Update associate
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
 *               associate_name:
 *                 type: string
 *               associate_website_url:
 *                 type: string
 *               associate_img_filename:
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
            const { associate_name, associate_website_url } = req.body;
            if (err) {
                return res.status(500).json({ error: err });
            }

            // Prepare update object
            const updateData = { associate_name, associate_website_url };

            if (req.file) {
                updateData.associate_img_filename = req.file.filename;
                updateData.associate_img_url = req.protocol + "://" + req.get("host") + "/" + req.file.filename;
            }

            const updatedCategory = await associatesSchema.findByIdAndUpdate(
                id,
                updateData,
                { new: true, runValidators: true }
            );

            if (!updatedCategory) {
                return res.status(404).json({ message: "Associate not found." });
            }

            return res.status(200).json({ message: "Associate updated successfully.", data: updatedCategory });
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
});



/**
 * @swagger
 * /api/associates/delete/{id}:
 *   delete:
 *     summary: Delete associate
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
        const find_and_delete = await associatesSchema.findByIdAndDelete(id)
        return res.status(200).json({ message: "Associate deleted successfully.", data: find_and_delete })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error })
    }
})






module.exports = router;
