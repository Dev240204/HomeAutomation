const express = require("express")
const User = require('../models/user')
const Relay = require('../models/relay')
const Device = require('../models/device')
const verifyToken = require('../middleware/verifyToken')
const crypto = require("crypto")

const router = express.Router()

router.use(verifyToken)

router.get("/",async(req,res)=>{
    try{
        const Devices = await Device.find({DeviceOwner : req.user.id})
        res.status(200).json({message : "Device retrived successfully",Devices})
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

router.post('/new',async (req,res) => {
    try{
        const randomid = crypto.randomBytes(16).toString('hex')

        const findDevice = await Device.find({DeviceOwner : req.user._id})

        console.log(findDevice.length)

        if(findDevice.length === 0){
            return res.status(400).json({message : "Device already registered for the owner"})
        }

        const NewDevice = await Device.create({
            UniqueId: randomid,
            DeviceOwner: req.user.id
        })
    
        res.status(200).json({message : "Device created successfully",NewDevice})
    }catch(err){
        res.status(500).json({error:err.message})
    }
}) 

module.exports = router