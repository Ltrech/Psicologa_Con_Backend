/// CONTROLADORES DEL MODULO ///




const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = require("../db/db");
const buscarUsuario = (email, res)=>{
    const sql = "SELECT * FROM usuarios where fecha_baja is null and email= ?";
    db.query(sql,[email], (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe el email"});
        };
        res.json(rows[0]); 
        // me muestra el elemento en la posicion cero si existe.
    });  
}

const buscarUsuarioPorEmail = function (email, res, cb) {
    const sql = "SELECT * FROM usuarios where fecha_baja is null and email= ?";
    let usuario = null;

    db.query(sql,[email], (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe el email"});
        };
		

        console.log("Row: "+ rows[0]);
       cb(rows[0]);
    }); 
  };
//// METODO GET  /////

// Para todos los usuarios
const alluser = (req, res) => {
    const sql = "SELECT * FROM usuarios where fecha_baja is null";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    }); 
};

// Para un usuario
const showusuarios = (req, res) => {
    const {id_usuarios} = req.params;
    const sql = "SELECT * FROM usuarios WHERE fecha_baja is null and id_usuarios = ?";
    db.query(sql,[id_usuarios], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe el usuario"});
        };
        res.json(rows[0]); 
        // me muestra el elemento en la posicion cero si existe.
    }); 
};

//// METODO POST  ////

//// insetar un nuevo usuario  ////
const storeUsuarios = (req, res) => {
    const { email, contrasena, fecha_baja } = req.body;
    if (!email || !contrasena || fecha_baja === undefined) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    console.log("Datos recibidos:", req.body);

    bcrypt.hash(contrasena, 8, (err, hashedPassword) => {
        if (err) {
            console.error("Error de encriptación:", err);
            return res.status(500).send("Error de encriptación");
        }

        const sql = "INSERT INTO usuarios (email, contrasena, fecha_baja) VALUES (?,?,?)";
        db.query(sql, [email, hashedPassword, fecha_baja], (error, result) => {
            if (error) {
                console.error("Error en la consulta SQL:", error);
                return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
            }

            const usuario = { ...req.body, id: result.insertId };
            res.status(201).json(usuario);
        });
    });
};


const buscarUsuarioPorid = function (id_usuarios, res, cb) {
    const sql_id = "SELECT * FROM usuarios where fecha_baja is null and id_usuarios= ?";
    let usuario = null;

    db.query(sql_id,[id_usuarios], (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe el usuario"});
        };
		

        console.log("Row: "+ rows[0]);
       cb(rows[0]);
    }); 
  };


//// METODO PUT  ////

//// Modificar Datos  ////
const updateusuario = (req, res) => {
    const { id_usuarios } = req.params;  
    const { email, contrasena, fecha_baja } = req.body;

    // Validar si el parámetro id_usuarios es válido
    if (!id_usuarios) {
        return res.status(400).json({ error: "El id del usuario es obligatorio" });
    }

    // Encriptar la contraseña antes de actualizar
    bcrypt.hash(contrasena, 8, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send("Error de encriptación");
        }

        // Consulta para actualizar el usuario
        const sql = "UPDATE usuarios SET email = ?, contrasena = ?, fecha_baja = ? WHERE id_usuarios = ?";
        const params = [email, hashedPassword, fecha_baja, id_usuarios];

        db.query(sql, params, (error, result) => {
            if (error) {
                console.log("Error en la consulta:", error);  // Mostrar error detallado en consola
                return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
            }

            if (result.affectedRows === 0) {
                return res.status(404).send({ error: "ERROR: El usuario a modificar no existe" });
            }

            // Respuesta con los datos actualizados
            res.json({ id_usuarios, email, fecha_baja });
        });
    });
};





//// METODO DELETE ////

//// Eliminar  ////
const destroyUsuario = (req, res) => {
    const {id_usuarios} = req.params;
    const sql = "DELETE FROM usuarios WHERE id_usuarios = ?";
    db.query(sql,[id_usuarios], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El Usuario no existe"});
        };
        res.json({mesaje : "Usuario Eliminado"});
    }); 
};




// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
    alluser,
    showusuarios,
    storeUsuarios,
    updateusuario,
    destroyUsuario,
    buscarUsuarioPorid,
    buscarUsuarioPorEmail
};
