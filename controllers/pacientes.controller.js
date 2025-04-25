/// CONTROLADORES DEL MODULO ///
const bcrypt = require('bcryptjs');
const db = require("../db/db");
const usuarioControllers = require("./usuarios.controller");


//// METODO GET  /////

// Para todos los Paciente
const allpacientes = (req, res) => {
    const sql = "SELECT * FROM pacientes";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    }); 
};

// Para un paciente
const showpacientes = (req, res) => {
    const {id_pacientes} = req.params;
    const sql = "SELECT * FROM pacientes WHERE id_pacientes = ?";
    db.query(sql,[id_pacientes], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe el paciente"});
        };
        res.json(rows[0]); 
        // me muestra el elemento en la posicion cero si existe.
    }); 
};

//// METODO POST  ////

//// insetar un nuevo paciente  ////
const storepacientes = (req, res) => {
    console.log(req.file);
    let imageName = "";
    if (req.file) {
      imageName = req.file.filename;
    }
  
    const {
      nombre_paciente,
      apellido_paciente,
      fecha_nac,
      telefono,
      domicilio,
      email,
      contrasena,
      rol
    } = req.body;
  
    if (
      !nombre_paciente ||
      !apellido_paciente ||
      !fecha_nac ||
      !telefono ||
      !domicilio ||
      !email ||
      !contrasena ||
      !rol
    ) {
      return res.status(400).send("Todos los campos son obligatorios");
    }
  
    // Validar si el email ya existe
    const sqlBuscarEmail = "SELECT * FROM usuarios WHERE email = ?";
    db.query(sqlBuscarEmail, [email], (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Error al verificar el email" });
      }
  
      if (results.length > 0) {
        return res.status(400).send("⚠️ El usuario ya está registrado con ese email.");
      }
  
      // ✅ Si no existe, hasheamos la contraseña
      bcrypt.hash(contrasena, 8, (err, hashedPassword) => {
        if (err) {
          return res.status(500).send("Error de encriptación");
        }
  
        // Insertar en la tabla usuarios
        const sqlUsuario = "INSERT INTO usuarios (email, contrasena) VALUES (?, ?)";
        db.query(sqlUsuario, [email, hashedPassword], (error, resultUsuario) => {
          if (error) {
            return res.status(500).json({ error: "ERROR: No se pudo insertar en usuarios" });
          }
  
          const usuario_id = resultUsuario.insertId;
  
          // Insertar rol
          const sqlRolUsuario = "INSERT INTO rol_por_usuario (id_usuarios, id_rol) VALUES (?, ?)";
          db.query(sqlRolUsuario, [usuario_id, rol], (errorRol) => {
            if (errorRol) {
              return res.status(500).json({ error: "ERROR: No se pudo asignar el rol al usuario" });
            }
  
            // Insertar paciente
            const sqlPaciente = "INSERT INTO pacientes (nombre_paciente, apellido_paciente, fecha_nac, telefono, domicilio, imagen, usuario_id) VALUES (?,?,?,?,?,?,?)";
            db.query(
              sqlPaciente,
              [nombre_paciente, apellido_paciente, fecha_nac, telefono, domicilio, imageName, usuario_id],
              (error, result) => {
                if (error) {
                  return res.status(500).json({ error: "ERROR: No se pudo insertar en pacientes" });
                }
  
                res.redirect("/admin");
              }
            );
          });
        });
      });
    });
  };
  
  

//// METODO PUT  ////

//// Modificar Datos  ////
const updatepacientes = (req, res) => {
    const {id_pacientes} = req.params;
    const {nombre_paciente,apellido_paciente, fecha_nac, telefono, domicilio} = req.body;
    const sql ="UPDATE pacientes SET nombre_paciente = ?, apellido_paciente = ?, fecha_nac = ?, telefono = ?, domicilio = ?, imagen = ? WHERE id_pacientes = ?";
    db.query(sql,[nombre_paciente,apellido_paciente, fecha_nac, telefono, domicilio,imageName, id_pacientes], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El Paciente a modificar no existe"});
        };
        
        
        const pacientes = {...req.body, ...req.params}; // ... reconstruir el objeto del body

        res.json(pacientes); // mostrar el elmento que existe
    });     
};


//// METODO DELETE ////

//// Eliminar Datos  ////
//// Baja lógica del paciente ////
const destroypacientes = async (req, res) => {
    const { id_pacientes } = req.params;

    try {
        // Buscar usuario_id desde pacientes
        const [rows] = await db.promise().query(
            'SELECT usuario_id FROM pacientes WHERE id_pacientes = ?', 
            [id_pacientes]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "Paciente no encontrado" });
        }

        const usuario_id = rows[0].usuario_id;

        // Baja lógica: setear fecha_baja
        await db.promise().query(
            'UPDATE usuarios SET fecha_baja = NOW() WHERE id_usuarios = ?',
            [usuario_id]
        );

        res.json({ mensaje: "Paciente dado de baja correctamente" });
    } catch (error) {
        console.error("Error al dar de baja:", error);
        res.status(500).json({ error: "Error del servidor" });
    }
};


// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
    allpacientes,
    showpacientes,
    storepacientes,
    updatepacientes,
    destroypacientes
};
