const express=require("express");
const app=express();
const mongoose=require("mongoose")
const dotenv=require("dotenv");
const userRoute=require("./Routes/user")
const authRoute = require("./Routes/auth")
const productRoute = require("./Routes/product")
dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Db Connection Successfull!")).catch((err)=>{
    console.log(err);
});

app.use(express.json());
app.use("/api/users",userRoute); //Whenever we go to "/api/user" our application will use userRoute and in userRoute we define any other end point...basically it is lh:5000/api/users/usertest. We should write users api/users.
app.use("/api/auth",authRoute);
app.use("/api/products",productRoute);
app.listen(process.env.PORT || 5000,()=>{
    console.log("Server is running!")
});
