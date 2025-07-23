const express = require('express')
const controllerRecuperacionPass = require('../controllers/controllerRecuperacionPass')

const router = express.Router()

router.post('/pin', async(req,res)=>{controllerRecuperacionPass.Pin(req,res)})
.post('/verifyPass', async(req,res)=>{controllerRecuperacionPass.verifyPass})
.post('/updatePass', async(req,res)=>{controllerRecuperacionPass.updatePass(req,res)})
module.exports= router