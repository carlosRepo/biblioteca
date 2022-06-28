import { Schema, model } from 'mongoose'

const solicitudUsuarioSchema = new Schema({
    idUsuario: {
        type: String,
    },
    datosEntregaLibro: [{
        idLibro: String,
        titulo: String,
        fechaSolicitud: String,
        fechaEntrega: String,
        fechaEntregaMaxima: String,
        cantidadLibro: String,
        estadoAntesEntrega: String,
        estadoDespuesEntrega: String
    }]

}, {
    timestamps: false,
    versionKey: false
});
export default model("SolicitudUsuario", solicitudUsuarioSchema);