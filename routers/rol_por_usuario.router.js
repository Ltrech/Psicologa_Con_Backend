const express = require("express");
const router = express.Router();



const controller = require("../controllers/rol_por_usuario.controller");

//// METODO GET  /////

// Para todos los productos
router.get('/', controller.allroles_por_usuario);

// Para un producto
router.get('/:id_rol', controller.showRol_por_usuario);


//// METODO POST  ////
router.post('/', controller.store_rol_por_usuario);


//// METODO PUT  ////
router.put('/:id_rol', controller.update_rol_por_usuario);

//// METODO DELETE ////
router.delete('/:id_rol', controller.delete_rol_por_usuario);












// EXPORTAR ROUTERS
module.exports = router;