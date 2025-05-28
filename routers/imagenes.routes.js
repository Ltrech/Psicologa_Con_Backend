

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

router.get('/', controller.obtenerImagenes);
router.post('/', upload.single('imagen'), controller.subirImagen);

module.exports = router;
