import { Schema, model } from 'mongoose'

const usuarioSchema = new Schema({
    rutUsuario: {
        type: String,
        required: true
    },
    nombreCompletoUsuario: {
        type: String,
        required: true
    },
    fechaNacimientoUsuario: {
        type: Date,
        required: true
    },
    direccionUsuario: {
        type: String,
        required: true
    },
    correoUsuario: {
        type: String,
        required: true
    },
    contraseñaUsuario: {
        type: String,
        required: true
    },
    estadoCuentaUsuario: {
        type: Boolean,
        required: true
    },
    cantidadMaximaAPedirUsuario: {
        type: Number,
        required: true
    },
    idPerfil: {
        type: [String],
        required: true
    }
}, {
    timestamps: false,
    versionKey: false
});
export default model("Usuario", usuarioSchema);