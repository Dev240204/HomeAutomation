const mongoose = require("mongoose")

const relaySchema = mongoose.Schema({
    DeviceName:{
        type: String,
        required: true,
    },
    GpioPin:{
        type:Number,
        required:true
    },
    Status:{
        type:Number,
        required:true,
        default:0
    },
    BoardNum:{
        type:Number,
        required:true
    },
    User:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required:true
    },
    Device:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Device',
        required:true
    }
})

const Relay = mongoose.model("Relay",relaySchema)

module.exports = Relay