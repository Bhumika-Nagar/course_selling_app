const mongoose= require("mongoose");
const Schema= mongoose.Schema;
const objectId= mongoose.Types.objectId;

const userSchema=new Schema({
    user_id: objectId,
    email:{type:String, unique:true},
    password:String,
    firstName:String,
    lastName:String
})

const courseSchema=new Schema({
    course_id:objectId,
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creater_id:objectId
})

const adminSchema=new Schema({
    admin_id:objectId,
    email:{type:String, unique:true},
    password:String,
    firstName:String,
    lastName:String
})

const purchaseSchema=new Schema({
    purchase_id:objectId,
    course_id:objectId,
    user_id:objectId
})

const userModel= mongoose.modelodel("user",userSchema);
const courseModel= mongoose.model("user",courseSchema);
const adminModel= mongoose.model("user",adminSchema);
const purchaseModel= mongoose.model("user",purchaseSchema);

module.exports={
    userModel,
    courseModel,
    adminModel,
    purchaseModel
}