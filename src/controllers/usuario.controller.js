import Usuario from '../models/Usuario'
import SolicitudUsuario from '../models/SolicitudUsuario'
import Libro from '../models/Libro'

export const loginUsuario = async(req, res) => {
    try {
        const usuario = await Usuario.find({ correoUsuario: req.body.correoUsuario, contraseñaUsuario: req.body.contraseñaUsuario }).lean()
        const solicitudUsuario = await SolicitudUsuario.find({ idUsuario: usuario[0]._id }).lean()
        var idLibros = [];
        solicitudUsuario.forEach(element => {
            element.datosEntregaLibro.forEach(elem => {
                idLibros.push(elem.idLibro)
            });
        });
        const libro = await Libro.find({ _id: { $in: idLibros } }).lean()
        if (usuario.length == 1) {
            res.render('paginaUsuario', { usuarios: usuario, solicitudUsuarios: solicitudUsuario, libros: libro });
        } else {
            res.redirect('/');
        }
    } catch (error) {
        console.log(error.message)
    }
}


export const renderEditUsuario = async(req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id).lean()
        res.render('editUsuario', usuario);
    } catch (error) {
        console.log(error.message)
    }
}


export const editUsuario = async(req, res) => {
    const { id } = req.params
    await Usuario.findByIdAndUpdate(id, req.body)
    res.redirect('/');
}

export const addUsuario = async(req, res) => {
    try {
        const usuario = Usuario(req.body)
        await usuario.save()
    } catch (error) {
        console.log(error)
    }

    res.redirect('/');
}

export const deleteUsuario = async(req, res) => {
    const usuario = await Usuario.findById(req.params.id).lean()
    usuario.estadoCuentaUsuario = !usuario.estadoCuentaUsuario;
    await Usuario.findByIdAndUpdate(req.params.id, usuario)
    res.redirect('/');
}