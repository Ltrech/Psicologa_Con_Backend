const db = require("../db/db");

const rolControllers = require("./rol.controller");


const vistaRoles = (req, res) => {
    const sql = "SELECT * FROM rol";
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).send("Error al cargar la vista de roles");
        }
        res.render("rol", { roles: rows });
    });
};



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


// para un rol
// //


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

        res.redirect('/rol/vista');
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
        res.redirect('/rol/vista'); // Respuesta con el rol actualizado
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
        res.redirect('/rol/vista');
    });
};


module.exports = {
    allroles,
    storeRol,
    updateRol,
    deleteRol,
    vistaRoles
    
};