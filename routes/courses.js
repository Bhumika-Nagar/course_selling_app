const Router= require("express");
const courseRouter= Router();
courseRouter.get("/preview",function(req,res){
    res.json({
        message:"hi there"
    })
})
courseRouter.get("/purchase",function(req,res){
    res.json({
        message:"hi there"
    })
})

module.exports={
    courseRouter: courseRouter
}