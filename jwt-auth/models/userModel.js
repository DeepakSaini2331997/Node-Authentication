const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        phone:{
            type:Number,
            required:true
        },
        image:{
            type:String
        },
        is_verified:{
            type:Number,
            default:0
        }
    },{
        timestamps:true
    }
)

const User = mongoose.model("user",userSchema)

module.exports = {
    User
}