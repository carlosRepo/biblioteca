import { Router } from "express";
import Libro from '../models/Libro'
import { addLibro, deleteLibro, editLibro, renderEditLibro, renderFindLibro } from "../controllers/libro.controller";
const router = Router()

//rutas de paginas


router.get('/about', (req, res) => {
    res.render('about');
})

router.get('/edit/:id', renderEditLibro)

router.get('/create', (req, res) => {
        res.render('create');
    })
    //rutas de crud
router.get('/', renderFindLibro);

router.post('/libro/add', addLibro);

router.post('/edit/:id', editLibro);

router.get('/delete/:id', deleteLibro);

export default router;