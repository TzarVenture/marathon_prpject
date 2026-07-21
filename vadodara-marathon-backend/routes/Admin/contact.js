const express = require("express")
const router = express.Router()
const contactSchema=require("../../models/contact")
const { val_register_user, val_login, val_user_is_admin,val_contact } = require("../../validation/fieldValidation")

/**
 * @swagger
 * /api/contact-us/add:
 *   post:
 *     summary: Add Contact Query
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fname:
 *                 type: string
 *               lname:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               feedback:
 *                 type: string
 *     responses:
 *       200:
 *         description: Added successfully
 */
router.post("/add",val_contact,async(req,res)=>{
    try {
        const {fname,lname,phone,email,feedback}=req.body

        const save_contact=new contactSchema({
            fname,lname,phone,email,feedback
        })

        await save_contact.save()
        return res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:save_contact,
            id:save_contact._id
        })
    } catch (error) {
        return res.status(500).json({
            successCode:500,
            message:"INTERNAL SERVER ERROR",
            error:error.message
        })
    }
})


/**
 * @swagger
 * /api/contact-us/all:
 *   get:
 *     summary: Get all contact queries
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Fetched successfully
 */
router.get("/all",val_login,val_user_is_admin,async(req,res)=>{
    try {
        const all_contact=await contactSchema.find().sort({createdAt:-1})
        return res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:all_contact
        })
    } catch (error) {
        return res.status(500).json({
            successCode:500,
            message:"INTERNAL SERVER ERROR",
            error:error.message
        })
    }
})

/**
 * @swagger
 * /api/contact-us/{id}:
 *   get:
 *     summary: Get contact query by ID
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
router.get("/:id",val_login,val_user_is_admin,async(req,res)=>{
    try {
        const id=req.params.id
        const contact_by_id=await contactSchema.findById(id)
        if(!contact_by_id){
            return res.status(404).json({
                successCode:404,
                message:"NOT FOUND",
                error:"Contact query with given id not found"
            })
        }
        return res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:contact_by_id
        })
    } catch (error) {   
        return res.status(500).json({
            successCode:500,
            message:"INTERNAL SERVER ERROR",
            error:error.message
        })
    }
})

/**
 * @swagger
 * /api/contact-us/update/{id}:
 *   put:
 *     summary: Update contact query
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
 *               fname:
 *                 type: string
 *               lname:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               feedback:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.put("/update/:id",val_login,val_user_is_admin,async(req,res)=>{
    try {
        const id=req.params.id
        const {fname,lname,phone,email,feedback}=req.body
        const contact_by_id=await contactSchema.findById(id)
        if(!contact_by_id){
            return res.status(404).json({
                successCode:404,
                message:"NOT FOUND",
                error:"Contact query with given id not found"
            })
        }
        contact_by_id.fname=fname
        contact_by_id.lname=lname
        contact_by_id.phone=phone
        contact_by_id.email=email
        contact_by_id.feedback=feedback
        await contact_by_id.save()
        return res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:contact_by_id
        })
    } catch (error) {
        return res.status(500).json({
            successCode:500,
            message:"INTERNAL SERVER ERROR",
            error:error.message
        })
    }
})

/**
 * @swagger
 * /api/contact-us/delete/{id}:
 *   delete:
 *     summary: Delete contact query
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
        const id=req.params.id
        const contact_by_id=await contactSchema.findById(id)
        if(!contact_by_id){
            return res.status(404).json({
                successCode:404,
                message:"NOT FOUND",
                error:"Contact query with given id not found"
            })
        }
        await contact_by_id.deleteOne()
        return res.status(200).json({
            successCode:200,
            message:"SUCCESS",
            data:contact_by_id
        })
    } catch (error) {
        return res.status(500).json({
            successCode:500,
            message:"INTERNAL SERVER ERROR",
            error:error.message
        })
    }
})

module.exports = router;