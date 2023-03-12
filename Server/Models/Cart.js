const mongoose=require("mongoose")



const CartSchema=new mongoose.Schema(
    {
        userId:{type:String,required:true}, //Required means compulsory and unique can not be same
        products:[
            {
                productId:{
                    type:String
                },
                quantity:{
                    type:Number,
                    default:1,
                },
            }
        ],
    },
    {timestamps:true} //It will going to create our createdAt time and updated at time
);

module.exports=mongoose.model("Cart",CartSchema);