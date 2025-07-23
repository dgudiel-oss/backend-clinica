const nodemailer = require('nodemailer')
require('dotenv').config()
const transporte = nodemailer.createTransport({
    host:process.env.SERVICIO,
    auth:{
        user: process.env.USERCORREO,
        pass:process.env.CONTRASENA
    }
})

async function envioCorreo({para,asunto,html}) {
    console.log(para,html,asunto)
   try {
    const options = {
     from: process.env.USERCORREO ,
     to: para,
     subject: asunto,
     html
    }

    const info = await transporte.sendMail(options)
    return {ok: true, info}
    } catch (error) {
        console.log(error)
    return {ok: false,error}
   }
}

module.exports= {envioCorreo}