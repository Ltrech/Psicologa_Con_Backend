const db = require("../db/db");

const rolControllers = require("./historia_clinica.controller");

//// METODO GET  /////

// Para todos los Paciente
const allhc = (req, res) => {
    const sql = "SELECT * FROM historia_clinica";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    }); 
};

// para un rol//
const showhc = (req, res) => {
    const {id_hc} = req.params;
    const sql = "SELECT * FROM historia_clinica WHERE id_hc = ?";
    db.query(sql,[id_hc], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe la Historia clinica"});
        };
        res.json(rows[0]); 
        // me muestra el elemento en la posicion cero si existe.
    }); 
};

module.exports = {
    allhc,
    showhc
    
};