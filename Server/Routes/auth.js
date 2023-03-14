const router=require("express").Router();
const User=require("../Models/User")
const CryptoJS = require("crypto-js")
const jwt=require("jsonwebtoken")
//REGISTER


router.post("/register",async(req,res)=>{ //Here we are using async await because it may take time to save user in our database due to internet connectiom, monogodb server etc so it is advised to use async await here.
    const newUser=new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC ).toString(),
    });
    try {
        const savedUser=await newUser.save(); //Saving our user to database
        res.status(201).json(savedUser);
        alert("Successfully registered");
        
    } catch (error) {
        res.status(500).json(error);
        
    }  
});

//LOGIN
router.post("/login",async(req,res)=>{
    try {
        const user=await User.findOne({email:req.body.email});
        !user && res.status(401).json("Wrong credentials")
        const hashedPassword=CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const pssword=hashedPassword.toString(CryptoJS.enc.Utf8);
        pssword!==req.body.password && res.status(401).json("Wrong credentials");

        const accessToken=jwt.sign({
            id:user._id,
            isAdmin: user.isAdmin,
        },process.env.JWT_SEC,
        {expiresIn:"3d"}
        )
        
        const {password,...others}=user._doc; //Make our password invisible from database for more security
        res.status(200).json({...others,accessToken});
    } catch (error) {
        res.status(500).json(error)
        
    }
    
})

module.exports=router;