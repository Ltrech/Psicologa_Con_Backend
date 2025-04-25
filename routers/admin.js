const express = require('express');
const router = express.Router();

const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Configurar almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // O cualquier carpeta válida
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});



// Controladores
const {
  mostrarPacientes,
  mostrarFormularioEditar,
  editarPaciente,
  cambiarImagenPrincipal
} = require('../controllers/admin.controller');

const upload = multer({ storage: storage });
// Ruta principal del panel de admin
router.get('/', mostrarPacientes);

// Formulario para editar un paciente
router.get('/editar/:id', mostrarFormularioEditar);

// Guardar cambios del paciente editado
router.post('/editar/:id', upload.single('imagen'), editarPaciente);

// Mostrar formulario para cambiar imagen principal
router.get('/imagenes', (req, res) => {
  res.render('admin_imagenes');
});

router.post('/imagenes', upload.single('imagen'), cambiarImagenPrincipal);

// Subir nueva imagen de pantalla principal
router.post('/imagenes', upload.single('imagen'), (req, res) => {
  const oldPath = req.file.path;
  const newPath = 'public/img/hero.jfif';

  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error("Error al reemplazar la imagen:", err);
      return res.status(500).send("Error al subir imagen");
    }
    res.redirect('/admin');
  });
});

module.exports = router;
