import Usuario from '../models/Usuario'



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
    const { id } = req.params;
    const usuario = await usuario.findById(id);
    usuario.estadoCuentaUsuario = !usuario.estadoCuentaUsuario;
    await usuario.save();
    res.redirect('/');
}