const {Router}= require("express");
const userRouter= Router();
const {userModel, purchaseModel, courseModel}= require("../db");
const jwt= require("jsonwebtoken");
const bcrypt= require("bcrypt");
const {z}= require("zod");

userRouter.post("/signup",async function(req,res){
    //const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    try{
    const requiredBody=z.object({
        email:z.string(),
        password:z.string().min(3).max(30),
        firstName:z.string().min(1).max(20),
        lastName:z.string().min(1).max(20),
    })
    const parsedDataWithSuccess = requiredBody.safeParse(req.body);
        if(!parsedDataWithSuccess.success){
            return res.status(400).json({
                message:"incorrect format",
                error: parsedDataWithSuccess.error
            })
            
         }

    const{email,password,firstName,lastName}= req.body;
    const hashedPassword= await bcrypt.hash(password,5);

    await userModel.create({
        email:email,
        password:hashedPassword,
        firstName:firstName,
        lastName:lastName
    })
    res.status(201).json({
        message:"user created successfully"
    })
    }catch (err) {
  res.status(500).json({ message: "Sign-up failed" });
}

    

});
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    if (!process.env.JWT_USER_SECRET) {
      throw new Error("JWT secret missing");
    }

    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_USER_SECRET
    );

    res.json({
      token,
      message: "You are signed in"
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    res.status(500).json({
      message: "Sign-in failed",
      error: err.message
    });
  }
});


userRouter.get("/purchases",async function(req,res){
    const userId= req.userId;
    const purchases= await purchaseModel.find({
        userId
    });
    const coursesData= await courseModel.find({
      _id:{$in:purchases.map(x=>x.courseId)}
    })
    res.json({
        purchases,
        coursesData
    })


})

module.exports= {
    userRouter: userRouter
}