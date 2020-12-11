const express = require('express');
const router = express.Router();
// importo cosas importantes
const Property = require('../models/Property')
const {verifyToken} = require('../utils/auth')
/* GET property page. 
    CRUD
    C = Create
    R = Read
    U = Update
    D = Delete
    obtener todas las propiedades
    crear la propiedad
    eliminar la propiedad
*/
//app.user('/api/property')
//localhost:3000/api/property

//ruta para crear propiedad
router.post('/', verifyToken, (req, res, next) =>{
    //voy a obtener el id del usuario loggeado para crear una propiedad (casa)
    const { _id:_owner } = req.user
                    // el spary operator funciona para obtener {title, address, description, etc.}
    Property.create({...req.body, _owner})
        .then((property)=>{
            res.status(201).json({result:property});
        }).catch((error)=> {
            res.status(400).json({msg:"Algo salió mal", error});
        });
});

//ruta para leer con filtro dinámico
router.get('/', verifyToken, (req, res, next) => {
                //req.query = {key:"value"}
    Property.find(req.query)
        .populate('_owner', 'email name profile_picture')
        .then((properties)=>{
            res.status(200).json({result:properties})
        }).catch((error)=>{
            res.status(400).json({msg:"Algo salio mal", error})
        })
});

//ruta para leer una sola propiedad por id
router.get('/:id', verifyToken, (req, res, next) => {
                // ":id" = "7aodnad89jelknacdlksdnco3"
                // req.params = {id:"80dasf8dscua0sd98ad"}
    const {id} = req.params;
    Property.findById(id)
        .populate("_owner","email name profile_picture")
        .then((property)=>{
            res.status(200).json({result:property})
        }).catch((error)=>{
            res.status(400).json({msg:"Algo salio mal", error})
        })
});

//ruta para update/editar propiedad
router.patch('/:id', verifyToken, (req, res, next) =>{
    const {id} = req.params;
    // req.body = {title:"perro", edad: "2", ...}
    Property.findByIdAndUpdate(id, req.body, {new:true})
        .populate("_owner","email name profile_picture")
        .then((property)=>{
            res.status(200).json({result:property})
        }).catch((error)=>{
            res.status(400).json({msg:"Algo salió mal", error})
        })
})

//ruta para borrar propiedad
router.delete('/:id', verifyToken, (req, res, next) =>{
    const {id} = req.params;
    // req.body = {title:"perro", edad: "2", ...}
    Property.findByIdAndRemove(id)
        .then((property)=>{
            res.status(200).json({msg:"Se borró la propiedad"})
        }).catch((error)=>{
            res.status(400).json({msg:"Algo salió mal", error})
        })
})

module.exports = router;