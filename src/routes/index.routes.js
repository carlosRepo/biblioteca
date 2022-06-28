import { Router } from "express";
import Libro from '../models/Libro'
import { addLibro, deleteLibro, editLibro, renderEditLibro, renderFindLibro, renderFindLibroUsuario } from "../controllers/libro.controller";
import { addUsuario, deleteUsuario, editUsuario, renderEditUsuario } from "../controllers/usuario.controller";
import { addSolicitudUsuario, stopSolicitudUsuario, editSolicitudUsuario, renderEditSolicitudUsuario } from "../controllers/solicitudUsuario.controller";
const router = Router()

//rutas de paginas


router.get('/about', (req, res) => {
    res.render('about');
})
router.get('/createUsuario', (req, res) => {
    res.render('createUsuario');
})

router.get('/createLibro', (req, res) => {
    res.render('createLibro');
})

router.get('/createSolicitudUsuario', renderFindLibroUsuario)

router.get('/editLibro/:id', renderEditLibro)
router.get('/editUsuario/:id', renderEditUsuario)

//rutas de crud libro
router.get('/', renderFindLibro);

router.post('/libro/add', addLibro);
router.post('/usuario/add', addUsuario);
router.post('/solicitudUsuario/add', addSolicitudUsuario);

router.post('/editLibro/:id', editLibro);
router.post('/editUsuario/:id', editUsuario);

router.get('/deleteLibro/:id', deleteLibro);
router.get('/deleteUsuario/:id', deleteUsuario);

export default router;