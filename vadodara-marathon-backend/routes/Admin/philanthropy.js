const express=require("express")
const router=express.Router()
const Philanthropy=require("../../models/philanthropy")
const {val_login,val_user_is_admin}=require("../../validation/fieldValidation")

/**
 * @swagger
 * /api/philanthropy/add:
 *   post:
 *     summary: Add philanthropy
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               philantropyType:
 *                 type: string
 *               philantropyContent:
 *                 type: string
 *               philantropySlug:
 *                 type: string
 *     responses:
 *       200:
 *         description: Added successfully
 */
// add philanthropy
router.post("/add",val_login,val_user_is_admin,async(req,res)=>{
    try{
  
        const {philantropyType,philantropyContent,philantropySlug}=req.body
        if(!philantropyType || !philantropyContent || !philantropySlug){
            return res.status(400).json({msg:"Please enter all fields"})
        }
        const newPhilanthropy=new Philanthropy({
            philantropyType,
            philantropyContent,
            philantropySlug
        })
        const savedPhilanthropy=await newPhilanthropy.save()
        res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:savedPhilanthropy._id
        })
    }catch(err){    
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})


/**
 * @swagger
 * /api/philanthropy/all:
 *   get:
 *     summary: Get all philanthropy
 *     responses:
 *       200:
 *         description: Fetched successfully
 */
// get all philanthropy
router.get("/all",async(req,res)=>{
    try{
        const allPhilanthropy=await Philanthropy.find().sort({createdAt:-1})
        res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:allPhilanthropy
        })
    }catch(err){
        // console.error(err.message)
        res.status(500).send("Server Error")
    }   
})

/**
 * @swagger
 * /api/philanthropy/{id}:
 *   get:
 *     summary: Get philanthropy by ID
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
// get specific philanthropy by id
router.get("/:id",val_login,val_user_is_admin,async(req,res)=>{
    try{
        const {id}=req.params
        const philanthropy=await Philanthropy.findById(id)
        if(!philanthropy){
            return res.status(404).json({msg:"Philanthropy not found"})
        }
        res.status(200).json({  
            successCode:200,
            message:"SUCCESS",
            data:philanthropy
        })
    }catch(err){
        // console.error(err.message)
        if(err.kind==="ObjectId"){
            return res.status(404).json({msg:"Philanthropy not found"})
        }
        res.status(500).send("Server Error")
    }   
})

/**
 * @swagger
 * /api/philanthropy/update/{id}:
 *   put:
 *     summary: Update philanthropy
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
 *               philantropyType:
 *                 type: string
 *               philantropyContent:
 *                 type: string
 *               philantropySlug:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated successfully
 */
// update philanthropy by id
router.put("/update/:id",val_login,val_user_is_admin,async(req,res)=>{
    try{
        const {id}=req.params
        const {philantropyType,philantropyContent,philantropySlug}=req.body
        const updatedPhilanthropy=await Philanthropy.findByIdAndUpdate(id,{ 
            philantropyType,
            philantropyContent,
            philantropySlug
        },{new:true})
        if(!updatedPhilanthropy){
            return res.status(404).json({msg:"Philanthropy not found"})
        }
        res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:updatedPhilanthropy
        })
    }catch(err){
        // console.error(err.message)
        if(err.kind==="ObjectId"){
            return res.status(404).json({msg:"Philanthropy not found"})
        }
        res.status(500).send("Server Error")
    }
})

/**
 * @swagger
 * /api/philanthropy/delete/{id}:
 *   delete:
 *     summary: Delete philanthropy
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
// delete philanthropy
router.delete("/delete/:id",val_login,val_user_is_admin,async(req,res)=>{
    try{ 
        const {id}=req.params
        const deletedPhilanthropy=await Philanthropy.findByIdAndDelete(id)
        if(!deletedPhilanthropy){
            return res.status(404).json({msg:"Philanthropy not found"})
        }   
        res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:deletedPhilanthropy._id
        })
    }catch(err){
        // console.error(err.message)
        res.status(500).send("Server Error")
    }
})

module.exports=router
