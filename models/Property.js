// Opcion 1
const mongoose = require("mongoose")
//Schema = Schema
const {Schema} = mongoose;

// Opcion 2
// const {Schema, model} = require('mongoose');

const propertySchema = new Schema(
    {
        // title address descripcion price images owner capacidad (numberRooms, ...)
        _owner: {
            type: Schema.Types.ObjectId,
            ref:"User",
            required: [true, "La propiedad debe tener un dueño"],
        },
        title: {
            type:String,
            required:[true, "La propiedad debe de incluir in titulo"],
        },
        address: {
            type:String,
            required:[true, "La propiedad debe de incluir una dirección"],
        },
        description: {
            type:String,
            minlength:[50, "La descrición no es suficeinte"],
        },
        images: {
            type:[String],
            minlength:[1, "La propiedad debe de incluir al menos una imagen"],
        },
        price: {
            type: Number,
            min:[1, "El precio de la propiedad es muy bajo"],
            required:[true, "La propiedad debe de incluir el precio"],
        },
        capacity: {
            type: Number,
            min:[1, "La propiedad debe de alojar al menos una persona"],
            required: [true, "La propiedad debe de incluir la capacidad de personas que aloja"]
        }
    },
    {timestamps:true}
);

module.exports = mongoose.model("Property",propertySchema)

//opcion 2
// module.exports = model("Property",propertySchema)