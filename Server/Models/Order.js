const mongoose=require("mongoose")



const OrderSchema=new mongoose.Schema(
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
        amount:{type:Number,required:true},
        address:{type:Object, required:true},
        status:{type:String, default:"pending"},
    },
    {timestamps:true} //It will going to create our createdAt time and updated at time
);

module.exports=mongoose.model("Order",OrderSchema);