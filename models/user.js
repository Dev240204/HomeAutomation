const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

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

// Hash password before saving
userSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model("User",userSchema)

module.exports = User