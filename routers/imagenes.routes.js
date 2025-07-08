

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const controller = require('../controllers/imagenes.controller');

// Configuración de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

// Esta es la ruta que maneja POST /imagenes
router.post('/', upload.single('imagen'), controller.subirImagen);

// Esta muestra el formulario con imágenes (GET /admin)
router.get('/admin', controller.renderAdminImagenes);

router.delete('/:id', controller.eliminarImagen);

router.post('/:id/editar', upload.single('imagen'), controller.editarImagen);


/// para la pagina psicologa
router.get('/lista', controller.obtenerImagenesPublicas);


router.post('/frase', controller.guardarFrase);
router.get('/lista', controller.listarContenido);

module.exports = router;
