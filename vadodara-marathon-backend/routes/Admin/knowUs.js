const express=require("express")
const router=express.Router()
const KnowUs=require("../../models/knowUs")
const {val_login,val_user_is_admin}=require("../../validation/fieldValidation")

/**
 * @swagger
 * /api/know-us/add:
 *   post:
 *     summary: Add Know Us
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               knowusType:
 *                 type: string
 *               knowusContent:
 *                 type: string
 *               knowusSlug:
 *                 type: string
 *     responses:
 *       200:
 *         description: Added successfully
 */
// add knowus
router.post("/add",val_login,val_user_is_admin,async(req,res)=>{
    try{
        const {knowusType,knowusContent,knowusSlug}=req.body
        if(!knowusType || !knowusContent || !knowusSlug){
            return res.status(400).json({msg:"Please enter all fields"})
        }
        const newKnowUs=new KnowUs({
            knowusType,
            knowusContent,
            knowusSlug
        })
        const savedKnowUs=await newKnowUs.save()
        res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:savedKnowUs._id
        })
    }catch(err){    
        // console.error(err.message)
        res.status(500).send("Server Error")
    }
})
/**
 * @swagger
 * /api/know-us/all:
 *   get:
 *     summary: Get all Know Us
 *     responses:
 *       200:
 *         description: Fetched successfully
 */
// get all knowus
router.get("/all",async(req,res)=>{
    try{
        const allKnowUs=await KnowUs.find().sort({createdAt:-1})
        res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:allKnowUs
        })
    }catch(err){
        // console.error(err.message)
        res.status(500).send("Server Error")
    }   
})

/**
 * @swagger
 * /api/know-us/{id}:
 *   get:
 *     summary: Get Know Us by ID
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
// get specific knowus by id
router.get("/:id",val_login,val_user_is_admin,async(req,res)=>{
    try{
        const {id}=req.params
        const knowus=await KnowUs.findById(id)
        if(!knowus){
            return res.status(404).json({msg:"KnowUs not found"})
        }
        res.status(200).json({  
            successCode:200,
            message:"SUCCESS",
            data:knowus
        })
    }catch(err){
        // console.error(err.message)
        if(err.kind==="ObjectId"){
            return res.status(404).json({msg:"KnowUs not found"})
        }
        res.status(500).send("Server Error")
    }   
})

/**
 * @swagger
 * /api/know-us/update/{id}:
 *   put:
 *     summary: Update Know Us
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               knowusType:
 *                 type: string
 *               knowusContent:
 *                 type: string
 *               knowusSlug:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated successfully
 */
// update knowus by id
router.put("/update/:id",val_login,val_user_is_admin,async(req,res)=>{
    try{
        const {id}=req.params
        const {knowusType,knowusContent,knowusSlug}=req.body
        const updatedKnowUs=await KnowUs.findByIdAndUpdate(id,{ 
            knowusType,
            knowusContent,
            knowusSlug
        },{new:true})
        if(!updatedKnowUs){
            return res.status(404).json({msg:"KnowUs not found"})
        }
        res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:updatedKnowUs
        })
    }catch(err){
        // console.error(err.message)
        if(err.kind==="ObjectId"){
            return res.status(404).json({msg:"KnowUs not found"})
        }
        res.status(500).send("Server Error")
    }
})

/**
 * @swagger
 * /api/know-us/delete/{id}:
 *   delete:
 *     summary: Delete Know Us
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
// delete knowus
router.delete("/delete/:id",val_login,val_user_is_admin,async(req,res)=>{
    try{ 
        const {id}=req.params
        const deletedKnowUs=await KnowUs.findByIdAndDelete(id)
        if(!deletedKnowUs){
            return res.status(404).json({msg:"KnowUs not found"})
        }   
        res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:deletedKnowUs._id
        })
    }catch(err){
        // console.error(err.message)
        res.status(500).send("Server Error")
    }
})

module.exports=router
