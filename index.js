require("dotenv").config();
const express= require("express");
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

    await mongoose.connect("mongodb+srv://bhumikanagar100_db_user:5rfLkWImNhTALB5N@cluster0.0skzoob.mongodb.net/course_selling_app");
    app.listen(5000);
}
main();

