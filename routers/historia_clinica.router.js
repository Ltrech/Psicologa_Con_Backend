const express = require("express");
const router = express.Router();



const controller = require("../controllers/historia_clinica.controller");

//// METODO GET  /////

// Para todos los productos
router.get('/', controller.allhc);

// Para un producto
router.get('/:id_hc', controller.showhc);


// EXPORTAR ROUTERS
module.exports = router;