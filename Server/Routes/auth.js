const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
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
        userId,
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
          res.status(500).send("Error creating user");
        }
      } else {
        // Other error, return a generic message
        console.error(err);
        res.status(500).send("Error creating user");
      }
    }
  });

//LOG IN
router.post("/signin", (req, res) => {
  const { email, password } = req.body; // assuming email and password are passed in the request body

  // find the user in the database by email
  User.findOne({ email }, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error finding user");
    } else if (!user) {
      res.status(401).send("User not found");
    } else {
      // check if the password is correct
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error checking password");
        } else if (!isMatch) {
          res.status(401).send("Incorrect password");
        } else {
          // set the userId as a cookie
          res.cookie("userId", user.userId);
          res.status(200).send("User signed in successfully");
        }
      });
    }
  });
});

module.exports = router;
