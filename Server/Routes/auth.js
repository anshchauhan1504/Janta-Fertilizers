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
  
      res.cookie("userId", userId);
      res.status(200).send("User created successfully");
    } catch (err) {
      if (err.code === 11000) {
        // Duplicate key error, handle it accordingly
        if (err.keyPattern.email) {
          res.status(409).send("Email already exists");
        } else if (err.keyPattern.userId) {
          res.status(409).send("User ID already exists");
        } else {
          res.status(500).send("Error ");
        }
      } else {
        // Other error, return a generic message
        console.error(err);
        res.status(500).send("Error creating user");
      }
    }
  });

//LOG IN
router.post("/signin", async (req, res) => {
  const { email, password } = req.body; // assuming email and password are passed in the request body

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(401).send("User not found");
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).send("Incorrect password");
      return;
    }

    res.cookie("userId", user.userId);
    console.log(user.userId)
    res.status(200).send("User signed in successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error finding user");
  }
});

//GET THE USER WHO SUCCESSFULLY LOGGED IN 

router.get("/user", async (req, res) => {
  const userId = req.cookies.userId;
  console.log(userId) //This is correctly printing
//After hitting request it is not going in try block 
  try {
    console.log("inside")
    const user = await User.findOne({ userId: userId });
    if (!user) {
      res.status(401).send("User not found");
      return;
    }
    console.log(user)
    res.status(200).send(user);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).send("Error finding user");
  }
});
module.exports = router;
