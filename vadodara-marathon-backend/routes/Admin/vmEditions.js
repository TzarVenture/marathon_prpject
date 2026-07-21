const express=require("express")
const router=express.Router()
const vmEditions=require("../../models/vmEditions")
const {val_login,val_user_is_admin}=require("../../validation/fieldValidation")

/**
 * @swagger
 * /api/vm-edition/add:
 *   post:
 *     summary: Add VM Edition
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vmeditionsType:
 *                 type: string
 *               vmeditionsContent:
 *                 type: string
 *               vmeditionsSlug:
 *                 type: string
 *     responses:
 *       200:
 *         description: Added successfully
 */
// add vmEditions
router.post("/add",val_login,val_user_is_admin,async(req,res)=>{
    try{
  
        const {vmeditionsType,vmeditionsContent,vmeditionsSlug}=req.body
        if(!vmeditionsType || !vmeditionsContent || !vmeditionsSlug){
            return res.status(400).json({msg:"Please enter all fields"})
        }
        const newVmEditions=new vmEditions({
            vmeditionsType,
            vmeditionsContent,
            vmeditionsSlug
        })
        const savedVmEditions=await newVmEditions.save()
        res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:savedVmEditions._id
        })
    }catch(err){    
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})


/**
 * @swagger
 * /api/vm-edition/all:
 *   get:
 *     summary: Get all VM Editions
 *     responses:
 *       200:
 *         description: Fetched successfully
 */
// get all vmEditions
router.get("/all",async(req,res)=>{
    try{
        const allVmEditions=await vmEditions.find().sort({createdAt:-1})
        res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:allVmEditions
        })
    }catch(err){
        // console.error(err.message)
        res.status(500).send("Server Error")
    }   
})

/**
 * @swagger
 * /api/vm-edition/{id}:
 *   get:
 *     summary: Get VM Edition by ID
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
// get specific vmEditions by id
router.get("/:id",val_login,val_user_is_admin,async(req,res)=>{
    try{
        const {id}=req.params
        const getvmEditions=await vmEditions.findById(id)
        if(!getvmEditions){
            return res.status(404).json({msg:"VmEditions not found"})
        }
        res.status(200).json({  
            successCode:200,
            message:"SUCCESS",
            data:getvmEditions
        })
    }catch(err){
        console.error(err.message)
        if(err.kind==="ObjectId"){
            return res.status(404).json({msg:"VmEditions not found"})
        }
        res.status(500).send("Server Error")
    }   
})

/**
 * @swagger
 * /api/vm-edition/update/{id}:
 *   put:
 *     summary: Update VM Edition
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
 *               vmeditionsType:
 *                 type: string
 *               vmeditionsContent:
 *                 type: string
 *               vmeditionsSlug:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated successfully
 */
// update vmEditions by id
router.put("/update/:id",val_login,val_user_is_admin,async(req,res)=>{
    try{
        const {id}=req.params
        const {vmeditionsType,vmeditionsContent,vmeditionsSlug}=req.body
        const updatedVmEditions=await vmEditions.findByIdAndUpdate(id,{ 
            vmeditionsType,
            vmeditionsContent,
            vmeditionsSlug
        },{new:true})
        if(!updatedVmEditions){
            return res.status(404).json({msg:"VmEditions not found"})
        }
        res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:updatedVmEditions
        })
    }catch(err){
        // console.error(err.message)
        if(err.kind==="ObjectId"){
            return res.status(404).json({msg:"VmEditions not found"})
        }
        res.status(500).send("Server Error")
    }
})

/**
 * @swagger
 * /api/vm-edition/delete/{id}:
 *   delete:
 *     summary: Delete VM Edition
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
// delete vmEditions
router.delete("/delete/:id",val_login,val_user_is_admin,async(req,res)=>{
    try{ 
        const {id}=req.params
        const deletedVmEditions=await vmEditions.findByIdAndDelete(id)
        if(!deletedVmEditions){
            return res.status(404).json({msg:"VmEditions not found"})
        }   
        res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:deletedVmEditions._id
        })
    }catch(err){
        // console.error(err.message)
        res.status(500).send("Server Error")
    }
})

module.exports=router
