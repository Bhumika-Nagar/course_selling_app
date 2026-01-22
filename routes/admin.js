const{Router}= require("express");
const adminRouter= Router();
const {adminModel, courseModel}= require("../db");
const jwt= require("jsonwebtoken");
const { z } = require("zod");
const bcrypt= require("bcrypt");
const {adminMiddleware}= require("../middlewares/admin");

adminRouter.post("/signup",async function(req,res){
    const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    try{
    const requiredBody= z.object({
            email: z.string().regex(emailRegex),
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
        
  console.error("SIGNUP ERROR", err);
  return res.status(500).json({
    error: err.message
  });


    }
    
})
adminRouter.post("/login",async function(req,res){
    try{
    const {email,password}= req.body;

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
adminRouter.get("/course/bulk",adminMiddleware,async function(req,res){
    try{
        const creatorId=req.userId;
        const{email,password}=req.body;

        const courses= await courseModel.find({
            creatorId:creatorId
        })
        res.json({
            courses
        })
    }catch(err){
        res.status(500).json({
            message:"caanot retrieve your courses",error:err.message
        })
    }

})
adminRouter.post("/course",adminMiddleware,async function(req,res){
    try{
        const creatorId= req.userId;
        const{title,description,imageUrl,price}= req.body;

        const courseId= await courseModel.create({
            title,
            description,
            imageUrl,
            price,
            creatorId
        })
        res.json({
            message:"course created",
            courseId: courseModel._id
        })
    }catch(err){
        res.status(500).json({
            message:"course not created",
            error:err.message
        })
        
    }
})

adminRouter.put("/course/:courseId", adminMiddleware, async function (req, res) {
    try {
        const creatorId = req.userId;
        const courseId = req.params.courseId;
        const { title, description, imageUrl, price } = req.body;

        const result = await courseModel.updateOne(
            {
                _id: courseId,
                creatorId: creatorId
            },
            {
                title,
                description,
                imageUrl,
                price
            }
        );

        if (result.matchedCount === 0) {
            return res.status(403).json({
                message: "course not found or not authorized"
            });
        }

        res.json({
            message: "course updated",
            courseId
        });
    } catch (err) {
        res.status(500).json({
            message: "course not updated",
            error: err.message
        });
    }
});


module.exports={
    adminRouter:adminRouter
}