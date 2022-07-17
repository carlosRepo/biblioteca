import Perfil from '../models/Perfil'


export const renderEditPerfil = async(req, res) => {
    try {
        const perfil = await Perfil.findById(req.params.id).lean()
        res.render('editPerfil', perfil);
    } catch (error) {
        console.log(error.message)
    }
}


export const editPerfil = async(req, res) => {
    const { id } = req.params
    await Perfil.findByIdAndUpdate(id, req.body)
    res.redirect('/');
}

export const addPerfil = async(req, res) => {
    const perfil = Perfil(req.body)
    await perfil.save()
    res.redirect('/');
}

export const deletePerfil = async(req, res) => {
    const { id } = req.params
    await Perfil.findByIdAndDelete(id)
    res.redirect('/');
}