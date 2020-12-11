const express = require('express');
const router = express.Router();
// importo cosas importantes
const Reservation = require('../models/Reservation');
const {verifyToken} = require('../utils/auth');



//ruta para leer todas las reservaciones por usuario
router.get('/', verifyToken, (req, res, next) => {
    const {_id} = req.user
    Reservation.find({_guest: _id})
        .populate({ // <---- agegar todo este para hacer un populate aninado
            path:"property",
            populate:{
                path:"_owner",
                select: "name",
            },
        })
        .then((reservations)=>{
            res.status(200).json({result:reservations})
        }).catch((error)=>{
            res.status(400).json({msg:"Algo salio mal", error})
        })
});

//ruta para leer todas las reservaciones por propiedad
router.get('/property/:property_id', verifyToken, (req, res, next) => {
    const {property_id} = req.params;
    Reservation.find({_property: property_id})
        .populate("_guest","name")
        .then((reservations)=>{
            res.status(200).json({result:reservations})
        }).catch((error)=>{
            res.status(400).json({msg:"Algo salio mal", error})
        })
});

//ruta para crear reservacion
router.post('/', verifyToken, (req, res, next) =>{
    const { _id:_guest } = req.user
    const reservation = {...req.body, _guest}
    Reservation.create(reservation)
        .then((reservation)=>{
            res.status(201).json({result:reservation});
        }).catch((error)=> {
            res.status(400).json({msg:"Algo salió mal", error});
        });
});

//ruta para update/editar reservacion
router.patch('/:id', verifyToken, (req, res, next) =>{
    const {id} = req.params;
    Reservation.findByIdAndUpdate(id, req.body, {new:true})
        .then((reservation)=>{
            res.status(200).json({result:reservation})
        }).catch((error)=>{
            res.status(400).json({msg:"Algo salió mal", error})
        })
})

//ruta para borrar propiedad
router.delete('/:id', verifyToken, (req, res, next) =>{
    const {id} = req.params;
    // req.body = {title:"perro", edad: "2", ...}
    Reservation.findByIdAndDelete(id)
        .then((reservation)=>{
            res.status(200).json({msg:"Se borró la reservación"})
        }).catch((error)=>{
            res.status(400).json({msg:"Algo salió mal", error})
        })
})

module.exports = router;