const db = require("../db/db");

const rolControllers = require("./tipo_sesion.controller");

//// METODO GET  /////

// Para todos las sesiones
const alltipo_sesion = (req, res) => {
    const sql = "SELECT * FROM tipo_sesion";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    }); 
};


// para una sesion//
const showtipo_sesion = (req, res) => {
    const {id_tipo_sesion} = req.params;
    const sql = "SELECT * FROM tipo_sesion WHERE id_tipo_sesion = ?";
    db.query(sql,[id_tipo_sesion], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe la sesion"});
        };
        res.json(rows[0]); 
        // me muestra el elemento en la posicion cero si existe.
    }); 
};

const createTipoSesion = (req, res) => {
    const { nombre_sesion, precio_sesion } = req.body;

    if (!nombre_sesion || precio_sesion === undefined) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const sql = "INSERT INTO tipo_sesion (nombre_sesion, precio_sesion) VALUES (?, ?)";

    db.query(sql, [nombre_sesion, precio_sesion], (error, result) => {
        if (error) {
            console.error("Error en la consulta:", error);
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        res.status(201).json({ id_tipo_sesion: result.insertId, nombre_sesion, precio_sesion });
    });
};


// Método PUT para actualizar un tipo de sesión
const updateTipoSesion = (req, res) => {
    const { id_tipo_sesion } = req.params;
    const { nombre_sesion, precio_sesion } = req.body;

    if (!nombre_sesion || precio_sesion === undefined) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const sql = "UPDATE tipo_sesion SET nombre_sesion = ?, precio_sesion = ? WHERE id_tipo_sesion = ?";

    db.query(sql, [nombre_sesion, precio_sesion, id_tipo_sesion], (error, result) => {
        if (error) {
            console.error("Error en la consulta:", error);
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "ERROR: El tipo de sesión a modificar no existe" });
        }

        res.status(200).json({ id_tipo_sesion, nombre_sesion, precio_sesion });
    });
};

// Método DELETE para eliminar un tipo de sesión
const deleteTipoSesion = (req, res) => {
    const { id_tipo_sesion } = req.params;

    const sql = "DELETE FROM tipo_sesion WHERE id_tipo_sesion = ?";

    db.query(sql, [id_tipo_sesion], (error, result) => {
        if (error) {
            console.error("Error en la consulta:", error);
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "ERROR: El tipo de sesión a eliminar no existe" });
        }

        res.status(200).json({ message: `Tipo de sesión con id ${id_tipo_sesion} eliminado exitosamente` });
    });
};


module.exports = {
    alltipo_sesion,
    showtipo_sesion,
    createTipoSesion,
    updateTipoSesion,
    deleteTipoSesion
    
};