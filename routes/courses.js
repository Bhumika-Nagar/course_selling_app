const Router= require("express");
const courseRouter= Router();
const{Usermiddleware}= require("../middlewares/user");
const{purchaseModel,courseModel}= require("../db");

courseRouter.post("/purchase",Usermiddleware,async function(req,res){
    const userId= req.userId;
    const courseId=req.body.courseId;

    await purchaseModel.create({
        userId,
        courseId
    })

res.json({
    message:"you have successfully bought the course"
    })
})
courseRouter.get("/preview",async function(req,res){
    //no middleware required
    
    const courses= await courseModel.find({});
    res.json({
        courses
    })

})

module.exports={
    courseRouter: courseRouter
}