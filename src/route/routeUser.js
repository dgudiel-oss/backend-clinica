const express = require('express')
const ControllerUser = require('../controllers/ControllerUser')
const router = express.Router()


router.get('/user', async(req,res)=>{ControllerUser.getUser(req,res)})
.post('/insert', async(req,res)=>{ControllerUser.createUser(req,res)})
.put('/update', async(req,res)=>{ControllerUser.updateUser(req,res)})
.put('/delete', async(req,res)=>{ControllerUser.deleteUser(req,res)})

module.exports = router
