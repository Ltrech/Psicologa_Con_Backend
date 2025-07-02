const express = require("express");
const router = express.Router();



const controller = require("../controllers/historia_clinica.controller");

//// METODO GET  /////
router.post('/historia', controller.agregarHistoriaClinica);
router.put('/historia/:id', controller.editarHistoriaClinica);


// Para todos los productos

// Mostrar vista con paciente + historia clínica
router.get('/paciente/:id_pacientes', controller.mostrarPacienteConHistoria);


router.delete('/historia/:id', controller.eliminarHistoriaClinica);


// EXPORTAR ROUTERS
module.exports = router;