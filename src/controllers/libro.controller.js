import Libro from '../models/Libro'
import Usuario from '../models/Usuario'
import SolicitudUsuario from '../models/SolicitudUsuario'
import Perfil from '../models/Perfil'

export const renderFindLibro = async(req, res) => {
    const [libros, usuarios, solicitudUsuarios, perfiles] = await Promise.all([Libro.find().lean(), Usuario.find().lean(), SolicitudUsuario.find().lean(), Perfil.find().lean()])
    res.render('index', { libros: libros, usuarios: usuarios, solicitudUsuarios: solicitudUsuarios, perfiles: perfiles })
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

export const addResenia = async(req, res) => {
    try {
        const libro = await Libro.findById(req.body._id).lean()
        libro.resenaLibro.forEach(element => {
            if (element.idUsuario == req.body.idUsuario) {

                Libro.updateOne({ _id: req.body._id, "resenaLibro.idUsuario": req.body.idUsuario }, { $set: { resenaLibro: { idUsuario: req.body.idUsuario, nombreUsuario: req.body.nombreCompletoUsuario, resenaPorUsuario: req.body.resenaPorUsuario, puntuacion: req.body.puntuacion } } })
            } else {
                console.log("idLibro" + req.body._id)
                console.log("idUsuario" + req.body.idUsuario)
                var resena = {
                    idUsuario: req.body.idUsuario,
                    nombreUsuario: req.body.nombreCompletoUsuario,
                    resenaPorUsuario: req.body.resenaPorUsuario,
                    puntuacion: req.body.puntuacion
                }
                console.log(resena)
                Libro.updateOne({ _id: req.body._id }, {
                        $push: { resenaLibro: resena }
                    },
                    function(error, success) {
                        if (error) {
                            console.log(error)
                        } else {
                            console.log(success)
                        }
                    }







                )






            }
        });

    } catch (error) {
        console.log(error.message)
    }
}