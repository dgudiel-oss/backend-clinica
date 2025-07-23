const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, path.join(__dirname, '../public'))
    },

    filename: (req,file,cb)=>{
        const img = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        cb(null,img)
    }
})

const filter = (req,file,cb)=>{
    const type = ['image/jpg', 'image/jpeg', 'image/png']
    if(type.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new Error('No se permiten este tipo de imagenes', false))
    }
}

const upload = multer({ storage: storage, fileFilter:filter}) 

module.exports = upload