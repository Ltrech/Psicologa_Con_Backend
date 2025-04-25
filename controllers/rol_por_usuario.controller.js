const db = require("../db/db");

const rolControllers = require("./rol_por_usuario.controller");

//// METODO GET  /////

// Para todos los Roles por usuario
const allroles_por_usuario = (req, res) => {
    const sql = "SELECT * FROM rol_por_usuario";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    }); 
};


// para un rol_por_usuario//
const showRol_por_usuario = (req, res) => {
    const {id_rol} = req.params;
    const sql = "SELECT * FROM rol_por_usuario WHERE id_rol = ?";
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

// Método POST para asignar un rol a un usuario
const store_rol_por_usuario = (req, res) => {
    const { id_rol, id_usuarios } = req.body;

    if (!id_rol || !id_usuarios) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const sql = "INSERT INTO rol_por_usuario (id_rol, id_usuarios) VALUES (?, ?)";

    db.query(sql, [id_rol, id_usuarios], (error, result) => {
        if (error) {
            console.error("Error en la consulta:", error);
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        res.status(201).json({ id_rol, id_usuarios });
    });
};

// Método PUT para actualizar un rol de usuario existente
const update_rol_por_usuario = (req, res) => {
    const { id_rol, id_usuarios } = req.body;
    const { id } = req.params; // id que se usará para identificar el rol por usuario a modificar

    if (!id_rol || !id_usuarios) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const sql = "UPDATE rol_por_usuario SET id_rol = ?, id_usuarios = ? WHERE id_rol = ? AND id_usuarios = ?";

    db.query(sql, [id_rol, id_usuarios, id_rol, id_usuarios], (error, result) => {
        if (error) {
            console.error("Error en la consulta:", error);
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "ERROR: El rol por usuario a modificar no existe" });
        }

        res.status(200).json({ id_rol, id_usuarios });
    });
};

const delete_rol_por_usuario = (req, res) => {
    const { id_rol, id_usuarios } = req.params;

    const sql = "DELETE FROM rol_por_usuario WHERE id_rol = ? AND id_usuarios = ?";

    db.query(sql, [id_rol, id_usuarios], (error, result) => {
        if (error) {
            console.error("Error en la consulta:", error);
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "ERROR: El rol por usuario a eliminar no existe" });
        }

        res.status(200).json({ message: `Rol por usuario con id_rol ${id_rol} e id_usuarios ${id_usuarios} eliminado exitosamente` });
    });
};





module.exports = {
    allroles_por_usuario,
    showRol_por_usuario,
    store_rol_por_usuario,
    update_rol_por_usuario,
    delete_rol_por_usuario


    
};