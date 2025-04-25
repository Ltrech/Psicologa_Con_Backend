const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento de imágenes con multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Carpeta donde se guardan
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único
  }
});
const upload = multer({ storage: storage });

// Controlador
const controller = require("../controllers/pacientes.controller");

// Rutas
router.get('/', controller.allpacientes);                    // Mostrar todos
router.get('/:id_pacientes', controller.showpacientes);      // Mostrar uno

router.post('/', upload.single('imagen'), controller.storepacientes);

// Actualizar paciente (usa PUT por convención REST)
router.put('/:id_pacientes', upload.single('imagen'), controller.updatepacientes);

// Eliminar paciente
router.delete('/:id_pacientes', controller.destroypacientes);

module.exports = router;
