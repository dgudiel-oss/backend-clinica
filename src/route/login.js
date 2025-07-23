const controllerLogin = require('../controllers/login')
const express = require('express')
const router = express.Router()

router.post('/login',async(req, res)=>{controllerLogin.login(req,res)})

module.exports=router

