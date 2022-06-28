import Libro from '../models/Libro'
import Usuario from '../models/Usuario'
import SolicitudUsuario from '../models/SolicitudUsuario'

export const renderFindLibro = async(req, res) => {
    const [libros, usuarios, solicitudUsuarios] = await Promise.all([Libro.find().lean(), Usuario.find().lean(), SolicitudUsuario.find().lean()])
    res.render('index', { libros: libros, usuarios: usuarios, solicitudUsuarios: solicitudUsuarios })
}

export const renderFindLibroUsuario = async(req, res) => {
    const [libros, usuarios] = await Promise.all([Libro.find().lean(), Usuario.find().lean()])
    res.render('createSolicitudUsuario', { libros: libros, usuarios: usuarios })
}

export const renderEditLibro = async(req, res) => {
    try {
        const libro = await Libro.findById(req.params.id).lean()
        res.render('editLibro', libro);
    } catch (error) {
        console.log(error.message)
    }
}


export const editLibro = async(req, res) => {
    const { id } = req.params
    await Libro.findByIdAndUpdate(id, req.body)
    res.redirect('/');
}

export const addLibro = async(req, res) => {
    const libro = Libro(req.body)
    await libro.save()
    res.redirect('/');
}

export const deleteLibro = async(req, res) => {
    const { id } = req.params
    await Libro.findByIdAndDelete(id)
    res.redirect('/');
}