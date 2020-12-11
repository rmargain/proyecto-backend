
//agregar dotenv
require("dotenv").config();


const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require("mongoose");
const cors = require('cors')



//Agregamos la conexion de mongoose

mongoose.connect(process.env.DB,{
   useNewUrlParser:true,
   useUnifiedTopology:true 
}).then((x)=>{
    console.log(`Connect to Mongo! Database name: "${x.connections[0].name}"`)
}).catch((err)=>{
    console.log("Error connecting to mongo", err)
})



const app = express();
//utilizo cors para darle permisos a otras apps
app.use(
    cors({
        origin: ['http://localhost:3001'],
        credentials: true,
    })
)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//estas son las rutas
//por practica agregamos prefijo api 
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const propertyRouter = require('./routes/property');
const reservationRouter = require('./routes/reservation')

app.use('/api', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/property', propertyRouter);
app.use('/api/reservation', reservationRouter);

module.exports = app;
