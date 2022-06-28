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
        const solicitudUsuario = SolicitudUsuario(req.body)
        console.log(req.body)
        await solicitudUsuario.save()
    } catch (error) {
        console.log(error)
    }

    res.redirect('/');
}

export const stopSolicitudUsuario = async(req, res) => {
    const solicitudUsuario = await SolicitudUsuario.findById(req.params.id).lean()
    solicitudUsuario.datosEntregaLibro.fechaEntregaMaxima = "hoy";
    await SolicitudUsuario.findByIdAndUpdate(req.params.id, solicitudUsuario)
    res.redirect('/');
}