const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
// const CryptoJS = require("crypto-js")
// const jwt=require("jsonwebtoken")
//REGISTER

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
  
    const crypto = require("crypto");
    const userId = crypto.randomBytes(16).toString("hex");
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        email,
        password: hashedPassword,
        userId:userId,
      });
  
      await newUser.save();
  
      // res.cookie("userId", userId);
      res.status(200).json({message:"User created successfully",userId:userId});//Sending to frontend
    } catch (err) {
      if (err.code === 11000) {
        // Duplicate key error, handle it accordingly
        if (err.keyPattern.email) {
          res.status(400).json({message:"Email already exists"});
        } else if (err.keyPattern.userId) {
          res.status(400).json({message:"User ID already exists"});
        } else {
          res.status(400).json({message:"Error "});
        }
      } else {
        // Other error, return a generic message
        console.error(err);
        res.status(400).json({message:"Error creating user"});
      }
    }
  });

//LOG IN
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({message:"User not found"});
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({message:"Incorrect password"});
      return;
    }
    // res.cookie("userId", user.userId, { secure: true, sameSite: "none" });
    // res.cookie("userId", user.userId);
    console.log(user.userId);
    console.log(user.email);
    res.status(200).json({ message: "User signed in successfully",userId:user.userId });
 // send JSON response
  } catch (err) {
    console.error(err);
    res.status(400).json({message:"Error finding user"});
  }
});



//Handle logout
router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("userId");
    res.status(200).json({message:"User logged out successfully"});
  } catch (err) {
    console.error(err);
    res.status(400).json({message:"Error logging out user"});
  }
});



//GET THE USER WHO SUCCESSFULLY LOGGED IN 

router.post("/user", async (req, res) => {
  const userId = req.body.userId; 
  console.log("userid123 : "+userId) 
  try {
    const user = await User.findOne({ userId: userId });
    console.log(user)
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    
    res.status(200).json({ message:"done alright",user}); // Return an object with the email property
    return;
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error finding user" });
  }
});
module.exports = router;
