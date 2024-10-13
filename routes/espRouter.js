const express = require("express")
const Relay = require('../models/relay')
const Device = require('../models/device')

const router = express.Router()

router.get('/', async (req,res) => {
    try{
        const id = req.get("Device-ID")
        const findDevice = await Device.findOne({UniqueId : id})

        if(!findDevice){
            return res.status(400).json({message: "Device not found for the provided id"})
        }
        const relays = await Relay.find({Device: findDevice._id})
        res.status(200).json({message:"List of all relays",relays})
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

module.exports = router