import { Schema, model } from 'mongoose'

const perfilSchema = new Schema({
    idPerfil: {
        type: String,
        required: true
    },
    nombrePerfil: {
        type: String,
        required: true
    },
    diasExtraPerfil: {
        type: Number,
        required: true
    }
}, {
    timestamps: false,
    versionKey: false
});
export default model("Perfil", perfilSchema);