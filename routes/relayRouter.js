const express = require("express")
const User = require('../models/user')
const Relay = require('../models/relay')
const Device = require('../models/device')
const verifyToken = require("../middleware/verifyToken")
const mongoose = require("mongoose")

const router = express.Router()

router.use(verifyToken);

// Create new Relay
router.post('/', async (req, res) => {
  try {
    const { name, gpiopin, status, boardnum } = req.body

    if (req.user.Type !== 'owner') {
        return res.status(403).json({ error: 'Only owners can create devices' });
    }
    
    const findDevice = await Device.findOne({DeviceOwner:req.user.id})
    if(!findDevice){
        return res.status(400).json({ error: `No ESP Board Associated with this user yet so you can't add relay` })
    }

    const relay = await Relay.findOne({ 
      GpioPin: gpiopin, 
      User: req.user.id, 
      BoardNum:boardnum 
    });
    if(relay){
        return res.status(400).json({ error: 'Gpiopin is occupied by other device' })
    }

    const newRelay = await Relay.create({ 
        DeviceName:name,
        GpioPin:gpiopin,
        Status:status,
        BoardNum: boardnum,
        User: req.user.id,
        Device: findDevice._id
     });
    res.status(201).json({message: "New relay added successfully",newRelay});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a existing device 
router.delete('/:id', async (req, res) => {
  try {
    if (req.user.Type !== 'owner') {
        return res.status(403).json({ error: 'Only owners can delete relays' });
    }
    const relay = await Relay.findOneAndDelete({ _id: req.params.id });
    if (!relay) return res.status(404).json({ error: 'Relay not found' });
    res.status(200).json({ message: 'Relay deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update the status of the device
router.patch('/:id/status', async (req, res) => {
  try {
    const relay = await Relay.findOneAndUpdate(
      { _id: req.params.id },
      { Status: req.body.status },
      { new: true }
    );
    if (!relay) return res.status(404).json({ error: 'Relay not found' });
    res.status(200).json(relay);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;