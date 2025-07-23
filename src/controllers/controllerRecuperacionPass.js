const { envioCorreo } = require('../utils/correjo')
const Usuario = require('../models/modelUsuario')
const crypto = require('crypto')
const bcrypt = require('bcrypt')



const generatedpin = ()=> {
    return crypto.randomBytes(10).toString('hex').slice(0,8)
}
const pin_expirated = new Date(Date.now()+ 5 * 60 *1000)
async function Pin(req,res) {
    try {
        const { correo } = req.body
        const usuario = await Usuario.findOne({
            where:{correo, estado:1}
        })
        if(!usuario)return res.status(401).json({message:"El usuario no existe o correo incorrecto"})
        usuario.pin = generatedpin()
        const htmlCorreo = `<h1>Pin de recuperacion ${usuario.pin}</h1>`

        const resultado = await envioCorreo({
            para:correo,
            asunto: "Pin de recuperacion",
            html: htmlCorreo
        })
        await usuario.update({
            pin: usuario.pin, pin_expirated})
        resultado ? res.status(200).json({message:"Pin enviado correctamente"}): res.status(401).json({message:"Error al enviar el pin"}) 
    } catch (error) {
        return res.status(500).json({message: error.message ||"Ocurrio un error inesperado"})
        
    }
}

async function verifyPass(req,res) {
    try {
        const {pin} = req.body
        const usuario = await Usuario.findOne({
            where: {pin}
        })
        if(!usuario || new Date()> usuario.pin_expirated){
            return res.status(401).json({message:"Pin incorrecto o expirado"})
        }
        return res.status(200).json({message:"Pin correcto"})
    } catch (error) {
        return res.status(500).json({message: error.message ||"Ocurrio un error inesperado"})
    }
    
}
async function updatePass(req,res) {
    try {
        const {pin,contrasena} = req.body
        const usuario = await Usuario.findOne({
            where:{pin}
        })
        if(!usuario || new Date()> usuario.pin_expirated){
            return res.status(401).json({message:"Pin incorrecto o expirado"})
        }
        const encriptacion = await bcrypt.genSalt(10)
        const contrasenaEncriptada = await bcrypt.hash(contrasena, encriptacion)
        await usuario.update({pin:null, pin_expirated: null, contrasena: contrasenaEncriptada})
        return res.status(200).json({message: "Contrasena actualizada correctamente"})
    } catch (error) {
        return res.status(500).json({message: error.message || "Ocurrio un error inesperado"})
        
    }
}
module.exports = {Pin, updatePass, verifyPass}