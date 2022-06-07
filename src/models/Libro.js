import { Schema, model } from 'mongoose'

const libroSchema = new Schema({
    tituloLibro: {
        type: String,
        required: true
    },
    editorialLibro: {
        type: String,
        required: true
    },
    autorLibro: {
        type: String,
        required: true
    },
    estadoLibro: {
        type: String,
        required: true
    },
    clasificacionLibro: {
        type: [String],
        required: true
    },
    cantidadTotalLibro: {
        type: Number,
        required: true
    },
    cantidadDisponibleLibro: {
        type: Number,
        required: true
    },
    resenaLibro: [{
        idUsuario: String,
        nombreUsuario: String,
        resenaPorUsuario: String,
        puntuacion: Number
    }]

}, {
    timestamps: false,
    versionKey: false
});
export default model("Libro", libroSchema);