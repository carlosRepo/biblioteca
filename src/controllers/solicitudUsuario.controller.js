import SolicitudUsuario from '../models/SolicitudUsuario'



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
    } catch (error) {
        console.log(error)
    }

    res.redirect('/');
}

export const stopSolicitudUsuario = async(req, res) => {
    var filter = { "datosEntregaLibro.fechaSolicitud": req.params.id }
    var update = { "datosEntregaLibro.$.fechaEntrega": new Date() }
    await SolicitudUsuario.findOneAndUpdate(filter, update)
    res.redirect('/');
}