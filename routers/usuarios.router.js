/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();

const controller = require("../controllers/usuarios.controller");

//// METODO GET  /////

// Para todos los productos
router.get('/', controller.alluser);



// Para un producto
router.get('/:id_usuarios', controller.showusuarios);

//// METODO POST  ////
router.post('/', controller.storeUsuarios);

//// METODO PUT  ////
router.put('/:id_usuarios', controller.updateusuario);

//// METODO DELETE ////
router.delete('/:id_usuarios', controller.destroyUsuario);

// EXPORTAR ROUTERS
module.exports = router;

