const db = require("../db/db");

const rolControllers = require("./rol.controller");

//// METODO GET  /////

// Para todos los Paciente
const allroles = (req, res) => {
    const sql = "SELECT * FROM rol";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    }); 
};


// para un rol//
const showRol = (req, res) => {
    const {id_rol} = req.params;
    const sql = "SELECT * FROM rol WHERE id_rol = ?";
    db.query(sql,[id_rol], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe el rol"});
        };
        res.json(rows[0]); 
        // me muestra el elemento en la posicion cero si existe.
    }); 
};

// Método POST para insertar un nuevo rol
const storeRol = (req, res) => {
    const { nombre_rol } = req.body;

    // Validación: Asegurarse de que el campo nombre_rol esté presente
    if (!nombre_rol) {
        return res.status(400).send("El campo 'nombre_rol' es obligatorio");
    }

    // Consulta SQL para insertar el nuevo rol
    const sql = "INSERT INTO rol (nombre_rol) VALUES (?)";

    // Ejecución de la consulta
    db.query(sql, [nombre_rol], (error, result) => {
        if (error) {
            console.error("Error en la consulta:", error);
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        // Construir la respuesta con el nuevo rol creado
        const nuevoRol = {
            id_rol: result.insertId, // Obtiene el ID generado
            nombre_rol
        };

        res.status(201).json(nuevoRol); // Respuesta con el rol creado
    });
};


// Método PUT para actualizar un rol
const updateRol = (req, res) => {
    const { id_rol } = req.params; // ID del rol que se quiere actualizar
    const { nombre_rol } = req.body; // Nombre nuevo del rol

    // Validación: Asegurarse de que se proporcionen ambos datos
    if (!id_rol || !nombre_rol) {
        return res.status(400).send("El 'id_rol' y 'nombre_rol' son obligatorios");
    }

    // Consulta SQL para actualizar el rol
    const sql = "UPDATE rol SET nombre_rol = ? WHERE id_rol = ?";

    // Ejecución de la consulta
    db.query(sql, [nombre_rol, id_rol], (error, result) => {
        if (error) {
            console.error("Error en la consulta:", error);
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        if (result.affectedRows === 0) {
            // Si no se encontró el rol con el ID proporcionado
            return res.status(404).json({ error: "ERROR: No existe el rol a modificar" });
        }

        // Construir la respuesta con el rol actualizado
        const rolActualizado = {
            id_rol: id_rol,
            nombre_rol: nombre_rol
        };

        res.json(rolActualizado); // Respuesta con el rol actualizado
    });
};

// Método DELETE para eliminar un rol
const deleteRol = (req, res) => {
    const { id_rol } = req.params; // ID del rol que se quiere eliminar

    // Consulta SQL para eliminar el rol
    const sql = "DELETE FROM rol WHERE id_rol = ?";

    // Ejecución de la consulta
    db.query(sql, [id_rol], (error, result) => {
        if (error) {
            console.error("Error en la consulta:", error);
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        if (result.affectedRows === 0) {
            // Si no se encontró el rol con el ID proporcionado
            return res.status(404).json({ error: "ERROR: No existe el rol a eliminar" });
        }

        // Respuesta exitosa
        res.status(200).json({ message: `Rol con id ${id_rol} eliminado exitosamente` });
    });
};


module.exports = {
    allroles,
    showRol,
    storeRol,
    updateRol,
    deleteRol
    
};