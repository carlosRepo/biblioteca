import Libro from '../models/Libro'

export const renderFindLibro = async(req, res) => {
    const libros = await Libro.find().lean()
    res.render('index', { libros: libros })
}

export const renderEditLibro = async(req, res) => {
    try {
        const libro = await Libro.findById(req.params.id).lean()
        res.render('edit', libro);
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