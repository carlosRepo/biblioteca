import SolicitudUsuario from '../models/SolicitudUsuario'
import Libro from '../models/Libro';


export const renderEditSolicitudUsuario = async(req, res) => {
    try {
        const solicitudUsuario = await SolicitudUsuario.findById(req.params.id).lean()
        res.render('editSolicitudUsuario', solicitudUsuario);
    } catch (error) {
        console.log(error.message)
    }
}


export const editSolicitudUsuario = async(req, res) => {
    const { id } = req.params
    console.table(req.params)
    await SolicitudUsuario.findByIdAndUpdate(id, req.body)
    res.redirect('/');
}

export const addSolicitudUsuario = async(req, res) => {
    try {
        const solicitudUsuario = SolicitudUsuario()
        solicitudUsuario.idUsuario = req.body.idUsuario;
        solicitudUsuario.datosEntregaLibro = [{
            idLibro: req.body.idLibro,
            titulo: req.body.titulo,
            fechaSolicitud: req.body.fechaSolicitud,
            fechaEntrega: req.body.fechaEntrega,
            fechaEntregaMaxima: req.body.fechaEntregaMaxima,
            cantidadLibro: req.body.cantidadLibro,
            estadoAntesEntrega: req.body.estadoAntesEntrega,
            estadoDespuesEntrega: req.body.estadoDespuesEntrega
        }];
        await solicitudUsuario.save()
        const libro = await Libro.findById(req.body.idLibro).lean()
        libro.cantidadDisponibleLibro = libro.cantidadDisponibleLibro - req.body.cantidadLibro
        await Libro.findByIdAndUpdate(req.body.idLibro, libro)

    } catch (error) {
        console.log(error)
    }

    res.redirect('/');
}

export const entregarLibroBuenEstado = async(req, res) => {
    var filter = { "datosEntregaLibro.fechaSolicitud": req.params.id }
    var update = { "datosEntregaLibro.$.fechaEntrega": new Date().toISOString() }
    var update2 = { "datosEntregaLibro.$.estadoDespuesEntrega": "Bueno" }

    await SolicitudUsuario.findOneAndUpdate(filter, update)
    await SolicitudUsuario.findOneAndUpdate(filter, update2)

    const solicitudUsuario = await SolicitudUsuario.findOne(filter).lean()
    const libro = await Libro.findById({ _id: solicitudUsuario.datosEntregaLibro[0].idLibro }).lean()
    libro.cantidadDisponibleLibro = libro.cantidadDisponibleLibro + solicitudUsuario.datosEntregaLibro[0].cantidadLibro;
    await Libro.findByIdAndUpdate(libro._id, libro)

    res.redirect('/');
}

export const entregarLibroMalEstado = async(req, res) => {
    var filter = { "datosEntregaLibro.fechaSolicitud": req.params.id }
    var update = { "datosEntregaLibro.$.fechaEntrega": new Date().toISOString() }
    var update2 = { "datosEntregaLibro.$.estadoDespuesEntrega": "Mal" }
    await SolicitudUsuario.findOneAndUpdate(filter, update)
    await SolicitudUsuario.findOneAndUpdate(filter, update2)
    res.redirect('/');
}