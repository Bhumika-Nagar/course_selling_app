require("dotenv").config();

console.log("JWT FROM ENTRY:", process.env.JWT_USER_SECRET);
console.log("MONGO URI FROM ENTRY:", process.env.MONGO_DB_URI);

const express = require("express");


const mongoose= require("mongoose");
const {userRouter} = require("./routes/user");
const {courseRouter} = require("./routes/courses");
const {adminRouter}= require("./routes/admin");

const app= express();

app.use(express.json());

app.use("/user",userRouter);
app.use("/course",courseRouter);
app.use("/admin",adminRouter);
async function main(){

    await mongoose.connect(process.env.MONGO_DB_URI);
    app.listen(5000);
    
}
main();


