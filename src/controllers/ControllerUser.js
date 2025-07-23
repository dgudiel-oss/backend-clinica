const { where } = require('sequelize')
const Usuario = require('../models/modelUsuario')
const bcrypt = require('bcrypt')
async function getUser(req,res){
    try {
        const response = await Usuario.findAll()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({message: error.message ||"Ocurrio un error inesperado"})
    }
}

async function createUser(req,res){
    try {
        const encriptacion = await bcrypt.genSalt(10)
        const contrasenaEncriptada = await bcrypt.hash(req.body.contrasena, encriptacion)
        const { nombreUsuario, roleId }= req.body

        const usuarioExistente = await Usuario.findOne({
            where:{ nombreUsuario }
        })
        if(usuarioExistente){
            if(usuarioExistente.estado === 1){
                return res.status(401).json({message: "El usuario ya existe"})
            }
            await Usuario.update({
                nombreUsuario,
                contrasena:contrasenaEncriptada,
                roleId,
                estado:1

            }, {where:{nombreUsuario}})
            return res.status(200).json({message: "Usuario actualizado correctamente"})
        }
        await Usuario.create({
            nombreUsuario,
            contrasena:contrasenaEncriptada,
            roleId
        })

        return res.status(200).json({message: "Usuario creado correctamente"})
    } catch (error) {
        return res.status(500).json({message: error.message ||"Ocurrio un error inesperado"})
        
    }
}

async function updateUser(req,res) {
    try {
        const {id} = req.query
        const updateData = {...req.body}
        if(!id){
            return res.status(400).json({message:"El id es requerido"})
        }
        const usuario = await Usuario.findByPk(id)
        if(!usuario ){
            return res.status(404).json({message:"El usuario no existe"})
        }

        if(req.body.contrasena){
            const encriptada = await bcrypt.genSalt(10)
            updateData.contrasena = await bcrypt.hash(req.body.contrasena, encriptada)
        }else{
        updateData.contrasena = usuario.contrasena
        }
        const [update] = await Usuario.update(updateData,{where: {id}})

        if(!update){
            return res.status(500).json({message:"Ocurrio un error al actualizar el usuario"})
        }
        return res.status(200).json({message:"Usuario actualizado correctamente"})

    } catch (error) {
        return res.status(500).json({message: error.message ||"Ocurrio un error inesperado"})
    }
}

async function deleteUser(req,res){
    try {
        const {id} = req.query
        if(!id){
            return res.status(400).json({message:"El id es requerido"})
        }

        const usuario = await Usuario.findByPk(id)
        if(!usuario){
            return res.status(404).json({message:"El usuario no existe"})
        }

        const [deleteUser] = await Usuario.update({estado:0},{where:{id}})

        if(!deleteUser){
            return res.status(500).json({message:"Ocurrio un error al eliminar el usuario"})
        }
        return res.status(200).json({message:"Usuario eliminado correctamente"})
    } catch (error) {
        return res.status(500).json({message: error.message ||"Ocurrio un error inesperado"})
    }
}

module.exports = { getUser,createUser, updateUser , deleteUser}