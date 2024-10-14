const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    Name:{
        type: String,
        required: true,
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    },
    UserType: { 
        type: String, 
        enum: ['owner', 'member'], 
        default: 'member',
        required:true
    }
})

const User = mongoose.model("User",userSchema)

module.exports = User