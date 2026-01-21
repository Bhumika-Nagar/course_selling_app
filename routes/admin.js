const{Router}= require("express");
const adminRouter= Router();
const {adminModel}= require("../db");
const jwt= require("jsonwebtoken");
const { z } = require("zod");
const bcrypt= require("bcrypt");

adminRouter.post("/signup",async function(req,res){
    try{
    const requiredBody= z.object({
            email: z.string(),
            password: z.string().min(3).max(30),
            firstName:z.string().min(1).max(20),
            lastName:z.string().min(1).max(20),
        });

        const parsedDataWithSuccess = requiredBody.safeParse(req.body);
        if(!parsedDataWithSuccess.success){
            res.json({
                message:"incorrect format",
                error: parsedDataWithSuccess.error
            })
            return
         }

    const{email,password,firstName,lastName}=req.body;
    const hashedPassword= await bcrypt.hash(password,5);

    await adminModel.create({
        email:email,
        password:hashedPassword,
        firstName:firstName,
        lastName:lastName
    })
    res.status(201).json({
        message:"admin created successfully"
    });
    }catch(err){
        
  console.error("SIGNUP ERROR 👉", err);
  return res.status(500).json({
    error: err.message
  });


    }
    
})
adminRouter.post("/login",async function(req,res){
    try{
    const {email,password,firstName,lastName}= req.body;

    const response= await adminModel.findOne({
        email:email
    });
    const passwordMatch= await bcrypt.compare(password,response.password);

    if(response && passwordMatch){
            const token= jwt.sign(
                {id:response._id.toString()},
                process.env.JWT_ADMIN_SECRET
            );
            res.json({
                token,
                message:"you are signed in"
            });
       }
    }catch(error){
        res.status(500).json({
            message:"sign-in failed",error:error.message
        })
    }
})
adminRouter.get("/course/bulk",function(req,res){})
adminRouter.get("/course",function(req,res){})
adminRouter.put("/course",function(req,res){})

module.exports={
    adminRouter:adminRouter
}