const {Router}= require("express");
const userRouter= Router();
const {userModel}= require("../db");
userRouter.post("/signup",function(req,res){
    const{username,password,name}= req.body;


});
userRouter.post("/login",function(req,res){})

userRouter.get("/purchases",function(req,res){})

module.exports= {
    userRouter: userRouter
}