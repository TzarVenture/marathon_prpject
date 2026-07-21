const express=require("express")
const router=express.Router();
const Privacy_notice=require("../../models/privacy_notice")
const {val_login,val_user_is_admin}=require("../../validation/fieldValidation")



/**
 * @swagger
 * /api/privacy-notice/add:
 *   post:
 *     summary: Add Privacy Notice
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Added successfully
 */
//add privacy_notice
router.post("/add",val_login,val_user_is_admin,async(req,res)=>{
    const {question,answer,type}=req.body
    if(!question || !answer || !type){
        return res.status(400).json({msg:"All fields are required"})
    }
    try{
        const newPrivacy_notice=new Privacy_notice({
            question,
            answer,
            type
        })  
        await newPrivacy_notice.save()
        res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:newPrivacy_notice._id
        })
    }
    catch(err){
        // console.error(err.message)
        res.status(500).send("Server Error")
    }
})

/**
 * @swagger
 * /api/privacy-notice/all:
 *   get:
 *     summary: Get all Privacy Notices
 *     responses:
 *       200:
 *         description: Fetched successfully
 */
//get all privacy_notice
router.get("/all",async(req,res)=>{
    try{
        const privacy_notices=await Privacy_notice.find().sort({createdAt:-1})
        res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:privacy_notices
        })
    }catch(err){
        // console.error(err.message)
        res.status(500).send("Server Error")
    }
})

/**
 * @swagger
 * /api/privacy-notice/{id}:
 *   get:
 *     summary: Get Privacy Notice by ID
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
//get single privacy_notice
router.get("/:id",val_login,val_user_is_admin,async(req,res)=>{
    try{
        const privacy_notice=await Privacy_notice.findById(req.params.id)
        if(!privacy_notice){
            return res.status(404).json({message:"Privacy_notice not found"})
        }
        res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:privacy_notice
        })
    }
    catch(err){
        return res.status(500).send("Server Error")
    }
})

/**
 * @swagger
 * /api/privacy-notice/update/{id}:
 *   put:
 *     summary: Update Privacy Notice
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
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated successfully
 */
//update privacy_notice
router.put("/update/:id",val_login,val_user_is_admin,async(req,res)=>{
    const {question,answer,type}=req.body
    if(!question || !answer || !type){
        return res.status(400).json({msg:"All fields are required"})
    }
    try{
        const privacy_notice=await Privacy_notice.findById(req.params.id)
        if(!privacy_notice){
            return res.status(404).json({message:"Privacy_notice not found"})
        }
        privacy_notice.question=question
        privacy_notice.answer=answer
        privacy_notice.type=type
        await privacy_notice.save()
        res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:privacy_notice
        })
    }catch(err){
        // console.error(err.message)
        if(err.kind==="ObjectId"){
            return res.status(404).json({message:"Privacy_notice not found"})
        }
        res.status(500).send("Server Error")
    }
})

/**
 * @swagger
 * /api/privacy-notice/delete/{id}:
 *   delete:
 *     summary: Delete Privacy Notice
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
    try{
        const deletePrivacy_notice=await Privacy_notice.findByIdAndDelete(req.params.id)
        if(!deletePrivacy_notice){
            return res.status(404).json({message:"Privacy_notice not found"})
        }
        // await deletePrivacy_notice.findByIdAndDelete(req.params.id)
        res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:{}
        })
    }catch(err){
        console.error(err.message)
        if(err.kind==="ObjectId"){  
            return res.status(404).json({message:"Past event not found"})
        }
        res.status(500).send("Server Error")
    }
})

module.exports=router;