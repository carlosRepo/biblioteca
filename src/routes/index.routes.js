import { Router } from "express";
import Libro from '../models/Libro'
import { addLibro, deleteLibro, editLibro, renderEditLibro, renderFindLibro } from "../controllers/libro.controller";
import { addUsuario, renderEditUsuario } from "../controllers/usuario.controller";
const router = Router()

//rutas de paginas


router.get('/about', (req, res) => {
    res.render('about');
})
router.get('/createUsuario', (req, res) => {
    res.render('createUsuario');
})
router.get('/editLibro/:id', renderEditLibro)
router.get('/editUsuario/:id', renderEditUsuario)

router.get('/createLibro', (req, res) => {
    res.render('createLibro');
})


//rutas de crud libro
router.get('/', renderFindLibro);

router.post('/libro/add', addLibro);

router.post('/usuario/add', addUsuario);

router.post('/editLibro/:id', editLibro);

router.get('/deleteLibro/:id', deleteLibro);

export default router;