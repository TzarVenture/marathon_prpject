const express = require("express")
const router = express.Router()
const race_category_schema = require("../../models/race_category")
const { val_register_user, val_login, val_user_is_admin } = require("../../validation/fieldValidation")


const multer = require("multer")
const path = require("path")



// configure storage engine and filename 
const storage = multer.diskStorage({
    destination: "./race_category/",
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
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
}).single('race_category_filename'); // 'file_name' is the name attribute of the file input field



/**
 * @swagger
 * /api/race-category:
 *   post:
 *     summary: Upload race category image
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               category_name:
 *                 type: string
 *               race_category_filename:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Uploaded successfully
 */
router.post("/", val_login, val_user_is_admin, async (req, res) => {
    try {
        upload(req, res, async (err) => {
            const { category_name } = req.body;
            // console.log(category_name)
            if (err) {
                console.log(err);
                return res.status(500).json({ error: err })
            }
            if (!req.file) {
                return res.status(400).json({ message: "Please send file." })
            }

            const file_name_of_doc = req.file.filename;

            const save_img_data = new race_category_schema({
                race_category_filename: file_name_of_doc,
                race_category_url: req.protocol + "://" + req.get("host") + "/" + file_name_of_doc,
                category_name: category_name
            })

            await save_img_data.save()
            return res.status(200).json({ message: "Race category uploaded successfully" })
        })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message })
    }
})


/**
 * @swagger
 * /api/race-category/fetch-all:
 *   get:
 *     summary: Fetch all race categories
 *     responses:
 *       200:
 *         description: Fetched successfully
 */
router.get("/fetch-all", async (req, res) => {
    try {
        const find_all_category = await race_category_schema.find();
        return res.status(200).json({ message: "Race category fetched successfully.", data: find_all_category })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error })
    }
})

/**
 * @swagger
 * /api/race-category/fetch-by-id/{id}:
 *   get:
 *     summary: Fetch race category by ID
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
router.get("/fetch-by-id/:id",val_login,val_user_is_admin, async (req, res) => {
    try {
        const id = req.params.id;
        const race_category = await race_category_schema.findById(id)
        return res.status(200).json({ message: "Particular Race category fetched successfully.", data: race_category })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error })
    }
})



/**
 * @swagger
 * /api/race-category/update/{id}:
 *   put:
 *     summary: Update race category
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
 *               category_name:
 *                 type: string
 *               race_category_filename:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.put("/update/:id",val_login,val_user_is_admin, async (req, res) => {
    try {
        const id = req.params.id;
        
        // If you want to allow updating the image, handle file upload
        upload(req, res, async (err) => {
            const { category_name } = req.body;
            if (err) {
                return res.status(500).json({ error: err });
            }

            // Prepare update object
            const updateData = { category_name };

            if (req.file) {
                updateData.race_category_filename = req.file.filename;
                updateData.race_category_url = req.protocol + "://" + req.get("host") + "/" + req.file.filename;
            }

            const updatedCategory = await race_category_schema.findByIdAndUpdate(
                id,
                updateData,
                { new: true, runValidators: true }
            );

            if (!updatedCategory) {
                return res.status(404).json({ message: "Race category not found." });
            }

            return res.status(200).json({ message: "Race category updated successfully.", data: updatedCategory });
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
});



/**
 * @swagger
 * /api/race-category/delete/{id}:
 *   delete:
 *     summary: Delete race category
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
router.delete("/delete/:id",val_login,val_user_is_admin,async(req,res)=>{
    try {
        const id=req.params.id;
        const find_and_delete= await race_category_schema.findByIdAndDelete(id)
        return res.status(200).json({message:"Race category deleted successfully.",data:find_and_delete})
    } catch (error) {
        return res.status(500).json({message:"Internal server error", error:error})
    }
})




module.exports = router;