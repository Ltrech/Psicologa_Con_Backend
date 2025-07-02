const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const methodOverride = require('method-override');
const serviciosController = require('../controllers/servicios.controller');

// Multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'), // <--- ¡fuera de public!
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nombre = Date.now() + ext;
    cb(null, nombre);
  }
});
const upload = multer({ storage });


router.use(methodOverride('_method'));

router.get('/admin', serviciosController.vistaAdminServicios);  // <--- ESTA LÍNEA
router.post('/', upload.single('imagen'), serviciosController.crearServicio);
router.delete('/:id', serviciosController.eliminarServicio);

module.exports = router;
