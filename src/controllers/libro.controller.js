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
    req.params.clasificacionLibro = req.params.clasificacionLibro.split(",")
    await Libro.findByIdAndUpdate(id, req.body)
    res.redirect('/');
}

export const addLibro = async(req, res) => {
    const libro = Libro(req.body)
    libro.clasificacionLibro = req.body.clasificacionLibro.split(",")
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
        var resena = {
            idUsuario: req.body.idUsuario,
            nombreUsuario: req.body.nombreCompletoUsuario,
            resenaPorUsuario: req.body.resenaPorUsuario,
            puntuacion: req.body.puntuacion
        }
        var encontrado = false;
        const libro = await Libro.findById(req.body._id).lean()
        libro.resenaLibro.forEach(element => {
            if (element.idUsuario == req.body.idUsuario) {
                console.log("encontrado")
                Libro.findOneAndUpdate({ _id: req.body._id, resenaLibro: { $elemMatch: { "resenaLibro.idUsuario": req.body.idUsuario } } }, { $set: { "resenaLibro.$": { idUsuario: resena.idUsuario, nombreUsuario: resena.nombreUsuario, resenaPorUsuario: resena.resenaPorUsuario, puntuacion: resena.puntuacion, } } },
                    function(error, success) {
                        if (error) {
                            console.log(error)
                        } else {
                            console.log(success)
                        }
                    })
                encontrado = true;
                res.redirect('/');
            }
        })
        if (encontrado == false) {
            Libro.updateOne({ _id: req.body._id }, {
                    $push: { resenaLibro: resena }
                },
                function(error, success) {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log(success)
                    }
                })
        }
        res.redirect('/');
    } catch (error) {
        console.log(error.message)
    }
}