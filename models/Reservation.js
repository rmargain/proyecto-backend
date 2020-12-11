const {Schema, model} = require('mongoose')

const reservationSchema = new Schema(
    {
        // aqui va mis atributos
        _property: {
            type:Schema.Types.ObjectId,
            ref:"Property",
            required: true,
        },
        _guest:{
            type:Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        checkin:{
            type: Date,
            required: [true, "Debes indicar la fecha de entrada"],
        },
        checkout:{
            type: Date,
            required: [true, "Debes de indicar la fecha de salida"]
        },
        guest_number:{
            type: Number,
            min:[1, "El minimo de personas por reservacion es 1"]
        },

    }, 
    {timestamps:true}
)

module.exports = model("Reservation", reservationSchema)