const express = require("express")
const router = express.Router()
const hero_image_home_page = require("../../models/hero_image_home_page")
const { val_register_user, val_login, val_user_is_admin } = require("../../validation/fieldValidation")


const multer = require("multer")
const path = require("path")
const { error } = require("console")


// configure storage engine and filename 
const storage = multer.diskStorage({
  destination: "./hero_image/",
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
}).single('hero_img_filename'); // 'file_name' is the name attribute of the file input field



// router.post("/",async(req,res)=>{
//     try {
//         upload(req,res,async(err)=>{
//             if(err){
//                 console.log(err);
//                 return res.status(500).json({error:err})
//             }
//             if(!req.file){
//                 return res.status(400).json({message:"Please send file."})
//             }

//             const file_name_of_doc=req.file.filename;

//             const save_img_data=new hero_image_home_page({
//                 hero_img_filename:file_name_of_doc,
//                 hero_image_file_url:req.protocol + "://" + req.get("host") + "/" + file_name_of_doc
//             })

//             await save_img_data.save()
//             return res.status(200).json({message:"Hero image uploaded successfully"})
//         })
//     } catch (error) {
//        return res.status(500).json({message:"Internal server error.",error:error}) 
//     }
// })

/**
 * @swagger
 * /api/hero-image:
 *   post:
 *     summary: Upload hero image
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               hero_img_filename:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Upload successful
 */
router.post("/", val_login, async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          successCode: 500,
          message: "Error while uploading",
          data: { error: err.message },
        });
      }

      if (!req.file) {
        return res.status(400).json({
          successCode: 400,
          message: "Please send file.",
          data: {},
        });
      }

      const file_name_of_doc = req.file.filename;

      const save_img_data = new hero_image_home_page({
        hero_img_filename: file_name_of_doc,
        hero_image_file_url:
          req.protocol + "://" + req.get("host") + "/" + file_name_of_doc,
      });

      const savedDoc = await save_img_data.save();

      return res.status(200).json({
        successCode: 200,
        message: "SUCCESS",
        data: {
          user: req.user, // dummy value, replace if you generate JWT
          id: savedDoc._id, // real MongoDB ID from the document
        },
      });
    });
  } catch (error) {
    return res.status(500).json({
      successCode: 500,
      message: "Internal server error.",
      data: { error: error.message },
    });
  }
});



/**
 * @swagger
 * /api/hero-image/fetch-hero-image:
 *   get:
 *     summary: Fetch all hero images
 *     responses:
 *       200:
 *         description: Fetched successfully
 */
router.get("/fetch-hero-image", async (req, res) => {
  try {
    const fetch_all = await hero_image_home_page.find()
    return res.status(200).json({ message: "All hero image fetched.", data: fetch_all })
  } catch (error) {
    return res.status(500).json({ message: "Internal server error.", error: error })
  }
})


/**
 * @swagger
 * /api/hero-image/fetch-hero/{id}:
 *   get:
 *     summary: Fetch hero image by ID
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
router.get("/fetch-hero/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const particular_hero = await hero_image_home_page.findById(id)
    return res.status(200).json({
      successCode: 200,
      message: "Success",
      data: {
        user: req.user,
        data: particular_hero.id
      }
    })
  } catch (error) {

  }
})

/**
 * @swagger
 * /api/hero-image/update-hero:
 *   put:
 *     summary: Update hero image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               hero_img_filename:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.put("/update-hero", (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if (!req.file) {
        return res.status(400).json({ message: "Please send file." });
      }

      const file_name_of_doc = req.file.filename;
      const imageUrl = req.protocol + "://" + req.get("host") + "/" + file_name_of_doc;

      // Find the latest hero image document and update it
      const latestHeroImage = await hero_image_home_page.findOne().sort({ createdAt: -1 });

      if (!latestHeroImage) {
        return res.status(404).json({ message: "No hero image found to update." });
      }

      latestHeroImage.hero_img_filename = file_name_of_doc;
      latestHeroImage.hero_image_file_url = imageUrl;
      await latestHeroImage.save();

      return res.status(200).json({ message: "Hero image updated successfully.", data: latestHeroImage });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error.", error: error });
  }
})


/**
 * @swagger
 * /api/hero-image/delete/{id}:
 *   delete:
 *     summary: Delete hero image
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
    const deletedKnowUs = await hero_image_home_page.findByIdAndDelete(id)
    if (!deletedKnowUs) {
      return res.status(404).json({ msg: "KnowUs not found" })
    }
    res.status(200).json({
      successCode: 200,
      message: "SUCCESS",
      data: deletedKnowUs._id
    })

  } catch (error) {

  }
})


module.exports = router;