const { Router}  = require("express");
const adminrouter = Router();
const bcrypt = require("bcrypt");
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken") ;
const { adminMiddleware } = require("../middleware/admin");
const { JWT_ADMIN_PASSWORD } = require("../config");

adminrouter.post("/signup",async (req,res)=>{     //user signup  //p5js web editor  
    const {email , firstname , lastname ,password } =  req.body ;
    const hashed_pwd = await bcrypt.hash(password,5);
    try{
    await adminModel.create({
        email : email ,
        firstname : firstname ,
        lastname : lastname ,
        password : hashed_pwd 
    })
    res.json({
        message : " Signup successful " ,
    })
}catch(e){
    res.json({
        message : "Error while signing up ",
        error : e.message 
    })
}

})

adminrouter.post("/signin",async (req,res)=>{    //user signin
    const {email , password } = req.body ;
    const admin = await adminModel.findOne({
        email : email ,
        password:password
    });
    if(!admin){
        res.json({
            message :  "User doesn't exist here"
        })
        return
    }
    const passwordMatchAdmin =bcrypt.compare(password,admin.password);
    if(passwordMatchAdmin){
        const token =jwt.sign({
            id:admin._id //id in admin.js
        },JWT_ADMIN_PASSWORD);
        console.log("JWT_ADMIN_PASSWORD:", process.env.JWT_ADMIN_PASSWORD);
        res.json({
            token:token
        });
    }else{
        res.status(404).json({
            message:"error while signing in ",
            error:e.error
        })
    }
    
})

adminrouter.post("/course",adminMiddleware,async (req,res)=>{    //user signin
    const adminId = req.userId;
    const{title , description , imageurl ,price } = req.body ;
    const course  = await courseModel.create({  // fix : let the user upload the actual image than the imageurl . 
        title , description , imageurl , price , creatorId : adminId ,
    })
    res.json({
        message : " Course Created " ,
        courseId : course._id 
    })

})

adminrouter.put("/course",adminMiddleware,async(req,res)=>{    //user signin
    const adminId = req.userId;
    const{title , description , imageurl ,price , courseId } = req.body ;
    const course  = await courseModel.updateOne({
        _id : courseId ,
        creatorId : adminId //creatorId : say flying beast -> protects the db of each individual 
    },{ 
        title , description , imageurl , price , creatorId : adminId ,
    });

    res.json({
        message : " Course updated " ,
         courseId : course._id 
    })
})

adminrouter.get("/course/bulk",adminMiddleware,async (req,res)=>{    //user signin
    const adminId = req.userId ;
    const course = await courseModel.find({
        creatorId : adminId 
    });
    res.json({
        message : "Course updated ",
        course 
    })
})

module.exports = {
    adminrouter : adminrouter
}
