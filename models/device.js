const mongoose = require("mongoose")

const deviceSchema = mongoose.Schema({
    UniqueId:{
        type:String,
        required:true
    },
    DeviceOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

const Device = mongoose.model("Device",deviceSchema)

module.exports = Device