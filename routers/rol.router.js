const express = require("express");
const router = express.Router();



const controller = require("../controllers/rol.controller");

//// METODO GET  /////

// Para todos los productos
//router.get('/', controller.allroles);//

// Para un producto



//// METODO POST  ////
router.post('/', controller.storeRol);


//// METODO PUT  ////
router.put('/:id_rol', controller.updateRol);

//// METODO DELETE ////
router.delete('/:id_rol', controller.deleteRol);

////PARA LAS VISTAS////
router.get('/vista', controller.vistaRoles);


// EXPORTAR ROUTERS
module.exports = router;