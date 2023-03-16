const mongoose=require("mongoose")



const userSchema=new mongoose.Schema(
    {
         //Required means compulsory and unique can not be same
        email:{type:String,required:true,unique:true},
        password:{type:String, required:true},
        userId:{type:String, required:true},
        cart:[]
    },
    {timestamps:true} //It will going to create our createdAt time and updated at time
);

module.exports=mongoose.model("User",userSchema);