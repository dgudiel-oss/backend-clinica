const usuario = require('../models/modelUsuario')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const passport = require('passport')
const Usuario = require('../models/modelUsuario')

const secret = process.env.SECRETE_KEY
const TimeExpirationToken = moment.duration(10,'days').asSeconds()

const generatedToken = (usuario)=>{
    return jwt.sign({id:usuario.id}, secret, {expiresIn:TimeExpirationToken})
}

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:secret
}, async(payload,done)=>{
    try {
        const usuario = await Usuario.findByPk(payload.id)
        if(!usuario){
            return done(null,false)
        }
        return done(null,usuario)
        
    } catch (error) {
        return done(error,false)
    }
}))

const verificatedUsuario = (req,res,next)=>{
    passport.authenticate('jwt', {session:false}, (error,usuario)=>{
        if(error)return res.status(500).json({message:"Error al autenticar"})
        if(!usuario)return res.status(401).json({message: "Token invalided"})

            req.user= usuario
            next()
    })(req,res,next)
}

const verifiactedRole = (rolesPermitidos)=>{
    return (res,req,next)=>{
        const usuario = req.user
        if(!usuario)return res.status(401).json({message:"Usurio no encontrado"})
        if(!rolesPermitidos.includes(usuario.roleid))return res.status(401).json({message:"No tienes permisos"})
            next()

    }
}

module.exports = { generatedToken, verifiactedRole, verificatedUsuario}