const express = require ("express");
const { Router } = require("express");
const { purchaseModel, courseModel } = require("../db");

const CourseRouter = Router();

    CourseRouter.post("/purchase",async (req,res)=>{ 
        const userId = req.userId ;
        const courseId = req.body.courseId ;

        await purchaseModel.create({
            userId ,
            courseId 
        })
        res.json({
            message:"You successfully bought the course "
        })
    
    
    })


    CourseRouter.get("/preview", async (req,res) => {   //user wants to see a list of courses
        const courses =await courseModel.find({});
        
        res.json({
            courses
        })
    })


module.exports = {
    CourseRouter : CourseRouter  
}