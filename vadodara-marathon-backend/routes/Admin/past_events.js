const express=require("express")
const router=express.Router()
const PastEvents=require("../../models/past_events")
const {val_login,val_user_is_admin}=require("../../validation/fieldValidation")


/**
 * @swagger
 * /api/past-events/add:
 *   post:
 *     summary: Add past event
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_name:
 *                 type: string
 *               event_date:
 *                 type: string
 *               event_desc:
 *                 type: string
 *     responses:
 *       200:
 *         description: Added successfully
 */
router.post("/add",val_login,val_user_is_admin,async(req,res)=>{
    const {event_name,event_date,event_desc}=req.body
    if(!event_name || !event_date || !event_desc){
        return res.status(400).json({msg:"All fields are required"})
    }
    try{
        const newPastEvent=new PastEvents({
            event_name,
            event_date,
            event_desc
        })
        await newPastEvent.save()
        res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:newPastEvent._id
        })
    }catch(err){
        // console.error(err.message)
        res.status(500).send("Server Error")
    }   
})

/**
 * @swagger
 * /api/past-events/all:
 *   get:
 *     summary: Get all past events
 *     responses:
 *       200:
 *         description: Fetched successfully
 */
//get all past events
router.get("/all",async(req,res)=>{
    try{
        const pastEvents=await PastEvents.find().sort({createdAt:-1})
        res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:pastEvents
        })
    }catch(err){
        // console.error(err.message)
        res.status(500).send("Server Error")
    }
})


/**
 * @swagger
 * /api/past-events/{id}:
 *   get:
 *     summary: Get past event by ID
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
//get single past event
router.get("/:id",val_login,val_user_is_admin,async(req,res)=>{
    try{
        const pastEvent=await PastEvents.findById(req.params.id)
        if(!pastEvent){
            return res.status(404).json({message:"Past event not found"})
        }
        res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:pastEvent
        })
    }catch(err){
        // console.error(err.message)
        if(err.kind==="ObjectId"){
            return res.status(404).json({message:"Past event not found"})
        }
        res.status(500).send("Server Error")
    }
})


/**
 * @swagger
 * /api/past-events/update/{id}:
 *   put:
 *     summary: Update past event
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
 *               event_name:
 *                 type: string
 *               event_date:
 *                 type: string
 *               event_desc:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated successfully
 */
//update past event
router.put("/update/:id",val_login,val_user_is_admin,async(req,res)=>{
    const {event_name,event_date,event_desc}=req.body
    const pastEventFields={}
    if(event_name) pastEventFields.event_name=event_name
    if(event_date) pastEventFields.event_date=event_date
    if(event_desc) pastEventFields.event_desc=event_desc
    try{
        let pastEvent=await PastEvents.findById(req.params.id)
        if(!pastEvent){
            return res.status(404).json({message:"Past event not found"})
        }
        pastEvent=await PastEvents.findByIdAndUpdate(req.params.id,{$set:pastEventFields},{new:true})
        res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:pastEvent
        })
    }catch(err){
        // console.error(err.message)
        if(err.kind==="ObjectId"){
            return res.status(404).json({message:"Past event not found"})
        }
        res.status(500).send("Server Error")
    }
})


/**
 * @swagger
 * /api/past-events/delete/{id}:
 *   delete:
 *     summary: Delete past event
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
//delete past event
router.delete("/delete/:id",val_login,val_user_is_admin,async(req,res)=>{
    try{
        const pastEvent=await PastEvents.findById(req.params.id)
        if(!pastEvent){
            return res.status(404).json({message:"Past event not found"})
        }
        await PastEvents.findByIdAndDelete(req.params.id)
        res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:{}
        })
    }catch(err){
        // console.error(err.message)
        if(err.kind==="ObjectId"){  
            return res.status(404).json({message:"Past event not found"})
        }
        res.status(500).send("Server Error")
    }
})

module.exports=router