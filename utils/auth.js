// esto nos va a servir para verificar si existe un usario y un token

const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.verifyToken = (req, res, next) => {
    //usamos verifyToken para ver si existe un token
    const {token} = req.cookies;

    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        //aqui va el codigo
        if(error) return res.stauts(401).json({error});
        // decoded = {id} o sea un objeto con la llave id (segun lo que ustedes guardaron)
        // Esto va a buscar con el objeto decoded en la llave id (hace referencia a users.js en routes)
        User.findById(decoded.id)
            .then((user)=>{
                // guardamos el usuario en el req.user para poder usarlo en cualquier lugar
                req.user = user;
                // con el next le decimos ya puedes seguir
                next()
            });
    });
};


// haremos un middleware para checar roles y un utils para limpiar respuesta de datos "basura"

// la propiedad "roles" puede ser un arreglo ["ADMIN", "USER"] o solo USER (en texto)
exports.checkRole = (roles) => {
    return (req, res, next) => {
        const {role} = req.user
        if(roles.includes(role)){
            return next()
        } else {
            return res.status(403).json({msg:"No tienes permisos para realizar esta acción"})
        }
    }
}

//Limpiar el objeto

exports.clearRes = (data) => {
    // destructuramos el objeto "data" y retornamos un nuevo objeto únicamente con los datos requeridos para nuestro "developer"
    const {password, __v, createdAt, updatedAt, ...cleanedData} = data;
    // esto va a corresponder a {key:"value"}
    return cleanedData
}