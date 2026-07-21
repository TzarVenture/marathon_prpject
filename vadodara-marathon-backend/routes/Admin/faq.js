const express=require("express")
const router=express.Router();
const Faq=require("../../models/faq")
const {val_login,val_user_is_admin}=require("../../validation/fieldValidation")



/**
 * @swagger
 * /api/faq/add:
 *   post:
 *     summary: Add FAQ
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
//add faq
router.post("/add",val_login,val_user_is_admin,async(req,res)=>{
    const {question,answer,type}=req.body
    if(!question || !answer || !type){
        return res.status(400).json({msg:"All fields are required"})
    }
    try{
        const newFaq=new Faq({
            question,
            answer,
            type
        })  
        await newFaq.save()
        res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:newFaq._id
        })
    }
    catch(err){
        // console.error(err.message)
        res.status(500).send("Server Error")
    }
})

/**
 * @swagger
 * /api/faq/all:
 *   get:
 *     summary: Get all FAQs
 *     responses:
 *       200:
 *         description: Fetched successfully
 */
//get all faq
router.get("/all",async(req,res)=>{
    try{
        const faqs=await Faq.find().sort({createdAt:-1})
        res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:faqs
        })
    }catch(err){
        // console.error(err.message)
        res.status(500).send("Server Error")
    }
})

/**
 * @swagger
 * /api/faq/{id}:
 *   get:
 *     summary: Get FAQ by ID
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
//get single faq
router.get("/:id",val_login,val_user_is_admin,async(req,res)=>{
    try{
        const faq=await Faq.findById(req.params.id)
        if(!faq){
            return res.status(404).json({message:"Faq not found"})
        }
        res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:faq
        })
    }
    catch(err){
        return res.status(500).send("Server Error")
    }
})

/**
 * @swagger
 * /api/faq/update/{id}:
 *   put:
 *     summary: Update FAQ
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
//update faq
router.put("/update/:id",val_login,val_user_is_admin,async(req,res)=>{
    const {question,answer,type}=req.body
    if(!question || !answer || !type){
        return res.status(400).json({msg:"All fields are required"})
    }
    try{
        const faq=await Faq.findById(req.params.id)
        if(!faq){
            return res.status(404).json({message:"Faq not found"})
        }
        faq.question=question
        faq.answer=answer
        faq.type=type
        await faq.save()
        res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:faq
        })
    }catch(err){
        // console.error(err.message)
        if(err.kind==="ObjectId"){
            return res.status(404).json({message:"Faq not found"})
        }
        res.status(500).send("Server Error")
    }
})

/**
 * @swagger
 * /api/faq/delete/{id}:
 *   delete:
 *     summary: Delete FAQ
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
        const deleteFaq=await Faq.findByIdAndDelete(req.params.id)
        if(!deleteFaq){
            return res.status(404).json({message:"Faq not found"})
        }
        // await deleteFaq.findByIdAndDelete(req.params.id)
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