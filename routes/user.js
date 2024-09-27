const express = require("express");// yaha pe first getting the express obj and then the key {Router}//const Router = express.Router;
const app = express() ;
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { z } = require("zod");
const  bcrypt  = require ("bcrypt");
const { userModel, purchaseModel ,courseModel } = require("../db"); //import userModel from db .
const userRouter = Router(); //note - Router() is the function 
app.use(express.json());
const {userMiddleware} = require("../middleware/user")
const {JWT_SECRET} = require("../config");

    userRouter.post("/signup",async (req,res)=>{    //user signup
        const {firstname , lastname , email , password} = req.body ;
        const requiredBody = z.object({
            email : z.string().min(3).max(100).email() ,
            firstname : z.string().min(3).max(100) , 
            lastname : z.string().min(3).max(100) , 
            password : z.string().min(3).max(100)
            
        })

        const parsedData = requiredBody.safeParse(req.body);
        
        if(!parsedData){
            res.json({
                message:"Incorrect Format",
                error:parsedData.error
            })
            return
        }
        try{
            const hashed = await bcrypt.hash(password, 5);  // Awaiting bcrypt hash
            console.log(hashed);

            await userModel.create({
                email : email ,
                firstname : firstname , 
                lastname : lastname ,
                password : hashed
            }); 

            res.json({
                message : " Greetings ! You have already been signed up "
            });
        }
        catch(e){
            res.json({
                message : "Error occured during the signup" ,
                error   : e.message 
            });
        }
        
    })

    userRouter.post("/signin",async (req,res)=>{        //user signin
        const { email , password } = req.body ;
        const user = await userModel.findOne({
            email  : email ,
             
        })
        if(!user){
            res.status(404).json({
                message: "User doesn't exist "
            })
            return 
        }

        const passwordMatch = bcrypt.compare(password,user.password);

        if(passwordMatch){
            const token = jwt.sign({
                id : user._id.toString(), //user id in hex convert it to hex
            },JWT_SECRET);
            //we cud also do here the cookie logic 
            res.json({
                token : token 
            });
        }else{
            res.status(404).json({
                message : "Incorrect Credentials "
            })
        }
    
    })
    
    userRouter.get("/purchase",userMiddleware,async (req,res)=>{  //users personal purchases
        const userId = req.userId ;
        const courseId = req.body.courseId;
        //add price paid or not chk point here 
        const purchase = await purchaseModel.find({
            userId ,
            courseId 
        });
        let purchasedCourseIds= [];
        for(let i = 0 ; i < purchase.length ; i++){
            purchasedCourseIds.push(purchase[i].courseId)
        }

        const coursesData = await courseModel.find({
            _id: { $in: purchasedCourseIds }
        })

        res.json({
            purchase ,
            coursesData
        })

    })

    userRouter.get("/preview",async (req,res)=>{
        const courses = await courseModel.find({});
        res.json({
            courses 
        })
    })


module.exports = {
    userRouter : userRouter 
}