const express = require("express");
const router = express.Router();



const controller = require("../controllers/tipo_sesion.controller");

//// METODO GET  /////

// Para todos los productos
router.get('/', controller.alltipo_sesion);

// Para un producto
router.get('/:id_tipo_sesion', controller.showtipo_sesion);

//// METODO POST  ////
router.post('/', controller.createTipoSesion);


//// METODO PUT  ////
router.put('/:id_tipo_sesion', controller.updateTipoSesion);

//// METODO DELETE ////
router.delete('/:id_tipo_sesion', controller.deleteTipoSesion);


// EXPORTAR ROUTERS
module.exports = router;