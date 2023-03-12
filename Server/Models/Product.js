const mongoose=require("mongoose")



const ProductSchema=new mongoose.Schema(
    {
        title:{type:String,required:true,unique:true}, //Required means compulsory and unique can not be same
        desc:{type:String,required:true,},
        img:{type:String, required:true},
        categories:{type:Array},
        price:{type:Number,required:true},
    },
    {timestamps:true} //It will going to create our createdAt time and updated at time
);

module.exports=mongoose.model("Product",ProductSchema);