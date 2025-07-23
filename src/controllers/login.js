const Usuario = require('../models/modelUsuario')
const bcrypt = require('bcrypt')
const { generatedToken } = require('../utils/token')

async function login(req,res){
    try {
        const {nombreUsuario, contrasena} = req.body
        const usuario = await Usuario.findOne({
            where:{nombreUsuario, estado:1}
        })
        if(!usuario)return res.status(401).json({message: "Usuario no encontrado"})
        const contrasenaValida = await bcrypt.compare(contrasena,usuario.contrasena)
        if(!contrasenaValida)return res.status(401).json({message: "Contrasena incorrecta"})
        const  {contrasena: _ , ...usuarioSanitizado} = usuario.toJSON()
        const token = generatedToken({id:usuario.id})
        return res.status(200).json({token,...usuarioSanitizado})
        
    } catch (error) {
        return res.status(500).json({message: error.message || "Ocurrio un error inesperado"})
    }
}

module.exports = {login}