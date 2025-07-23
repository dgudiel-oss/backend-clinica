const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./config/db');
const ModeloUsuario = require('./models/modelUsuario');
const RoteUser = require('./route/routeUser')
const RouteLoginUser =require('./route/login')
const RouterRecuperacionPass = require('./route/routeUpdatePass')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
db.authenticate().then(async ()=>{
    console.log("Database connected successfully");
    await ModeloUsuario.sync()
}).catch((err)=>{
    console.log("Unable to connect to the database:", err);
})


app.use('/api/user', RoteUser)
app.use('/api/userLogin', RouteLoginUser)
app.use('/api/updatePass', RouterRecuperacionPass)
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})