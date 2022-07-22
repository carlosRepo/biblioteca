import { Router } from "express";
import Libro from '../models/Libro'
import { addLibro, deleteLibro, editLibro, renderEditLibro, renderFindLibro, renderFindLibroUsuario, addResenia } from "../controllers/libro.controller";
import { loginUsuario, addUsuario, deleteUsuario, editUsuario, renderEditUsuario } from "../controllers/usuario.controller";
import { addSolicitudUsuario, entregarLibroMalEstado, entregarLibroBuenEstado, editSolicitudUsuario, renderEditSolicitudUsuario } from "../controllers/solicitudUsuario.controller";
import { addPerfil, deletePerfil, editPerfil, renderEditPerfil } from "../controllers/perfil.controller";
const router = Router()

//rutas de paginas


router.get('/login', (req, res) => {
    res.render('login');
})
router.post('/loginUsuario/', loginUsuario)

router.get('/createUsuario', (req, res) => {
    res.render('createUsuario');
})
router.get('/createLibro', (req, res) => {
    res.render('createLibro');
})
router.get('/createPerfil', (req, res) => {
    res.render('createPerfil');
})
router.get('/createSolicitudUsuario', renderFindLibroUsuario)


router.get('/editLibro/:id', renderEditLibro)
router.get('/editUsuario/:id', renderEditUsuario)
router.get('/editPerfil/:id', renderEditPerfil)
    //rutas de crud libro
router.get('/', renderFindLibro);


router.post('/libro/add', addLibro);
router.post('/usuario/add', addUsuario);
router.post('/solicitudUsuario/add', addSolicitudUsuario);
router.post('/perfil/add', addPerfil);
router.post('/resenia/add', addResenia);

router.post('/editLibro/:id', editLibro);
router.post('/editUsuario/:id', editUsuario);
router.post('/editPerfil/:id', editPerfil);

router.get('/deleteLibro/:id', deleteLibro);
router.get('/deleteUsuario/:id', deleteUsuario);
router.get('/deletePerfil/:id', deletePerfil);
router.get('/entregarLibro/:id', entregarLibroBuenEstado);
router.get('/entregarLibroMal/:id', entregarLibroMalEstado);
export default router;