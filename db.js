const mongoose= require("mongoose");
const Schema= mongoose.Schema;
const objectId= mongoose.Types.ObjectId;

const userSchema=new Schema({
    //user_id: mongoose.Schema.Types.ObjectId,
    email:{type:String, unique:true},
    password:String,
    firstName:String,
    lastName:String
})

const courseSchema=new Schema({
    //course_id:mongoose.Schema.Types.ObjectId,
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creater_id:objectId
})

const adminSchema=new Schema({
    //admin_id:mongoose.Schema.Types.ObjectId,
    email:{type:String, unique:true},
    password:String,
    firstName:String,
    lastName:String
})

const purchaseSchema=new Schema({
     purchase_id:mongoose.Schema.Types.ObjectId
    //course_id:mongoose.Schema.Types.ObjectId,
    //user_id:mongoose.Schema.Types.ObjectId
})

const userModel= mongoose.model("user",userSchema);
const courseModel= mongoose.model("course",courseSchema);
const adminModel= mongoose.model("admin",adminSchema);
const purchaseModel= mongoose.model("puchase",purchaseSchema);

module.exports={
    userModel,
    courseModel,
    adminModel,
    purchaseModel
}