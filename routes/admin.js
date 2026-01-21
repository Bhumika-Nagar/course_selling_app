const{Router}= require("express");
const adminRouter= Router();
const {adminModel}= require("../db");
const { jwt } = require("zod");

adminRouter.post("/signup",async function(req,res){
    
})
adminRouter.post("/login",async function(req,res){
    try{
    const {email,password,firstName,lastName}= req.body;

    const response= await adminModel.findOne({
        email:email
    });
    const passwordMatch= await bcrypt.compare(password,response.password);

    if(response && passwordMatch){
            const token= jwt.toString(
                {id:response._id.toString()},
                process.env.JWT_SECRET
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
adminRouter.post("/course",function(req,res){})
adminRouter.put("/course",function(req,res){})

mondule.exports={
    adminRouter:adminRouter
}