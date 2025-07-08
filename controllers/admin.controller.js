const db = require("../db/db");

const fs = require('fs');
const path = require('path');



// Mostrar todos los pacientes
const mostrarPacientes = (req, res) => {
    const query = `
        SELECT 
            pacientes.Id_pacientes AS id_pacientes,
            pacientes.usuario_id AS id_usuario,
            pacientes.nombre_paciente,
            pacientes.apellido_paciente,
            pacientes.fecha_nac,
            pacientes.telefono,
            pacientes.domicilio,
            pacientes.imagen,
            usuarios.email,
            rol.nombre_rol AS rol
        FROM pacientes 
        JOIN usuarios ON pacientes.usuario_id = usuarios.id_usuarios
        LEFT JOIN rol_por_usuario ON usuarios.id_usuarios = rol_por_usuario.id_usuarios
        LEFT JOIN rol ON rol_por_usuario.id_rol = rol.id_rol
        WHERE usuarios.fecha_baja IS NULL
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('❌ Error al recuperar pacientes:', err);
            return res.status(500).send('Error al recuperar pacientes');
        }

        res.render('admin', { pacientes: results });
    });
};



// Mostrar formulario de edición
const mostrarFormularioEditar = async (req, res) => {
    const id = req.params.id;
  
    try {
      // Obtener datos del paciente con su rol (si existe)
      const [pacienteRows] = await db.promise().query(`
        SELECT p.*, u.email, rpu.id_rol 
        FROM pacientes p
        JOIN usuarios u ON p.usuario_id = u.id_usuarios
        LEFT JOIN rol_por_usuario rpu ON rpu.id_usuarios = u.id_usuarios
        WHERE p.Id_pacientes = ?
      `, [id]);
  
      const paciente = pacienteRows[0];
  
      if (!paciente) {
        return res.status(404).send('Paciente no encontrado');
      }
  
      // Obtener todos los roles disponibles
      const [roles] = await db.promise().query(`SELECT * FROM rol`);
  
      res.render('editar_paciente', { paciente, roles });
  
    } catch (err) {
      console.error("Error al obtener paciente para editar:", err);
      res.status(500).send("Error interno");
    }
  };
  
  

// Guardar paciente editado
const editarPaciente = async (req, res) => {
    const id = req.params.id;
    const {
        nombre_paciente,
        apellido_paciente,
        fecha_nac,
        telefono,
        domicilio,
        email,
        rol
    } = req.body;

    const nuevaImagen = req.file ? req.file.filename : null;

    console.log("📩 ID del paciente desde la URL:", id);
    console.log("📦 Datos recibidos del formulario:", {
        nombre_paciente,
        apellido_paciente,
        fecha_nac,
        telefono,
        domicilio,
        email,
        imagen: nuevaImagen,
        rol
    });

    try {
        // 1. Obtener el usuario_id correspondiente al paciente
        const [pacienteRows] = await db.promise().query(`
            SELECT usuario_id FROM pacientes WHERE Id_pacientes = ?
        `, [id]);

        if (pacienteRows.length === 0) {
            return res.status(404).send("Paciente no encontrado");
        }

        const usuario_id = pacienteRows[0].usuario_id;

        // 2. Actualizar datos del paciente
        let queryPaciente = `
            UPDATE pacientes 
            SET nombre_paciente = ?, apellido_paciente = ?, fecha_nac = ?, telefono = ?, domicilio = ?
        `;
        const queryParams = [nombre_paciente, apellido_paciente, fecha_nac, telefono, domicilio];

        if (nuevaImagen) {
            queryPaciente += `, imagen = ?`;
            queryParams.push(nuevaImagen);
        }

        queryPaciente += ` WHERE Id_pacientes = ?`;
        queryParams.push(id);

        await db.promise().query(queryPaciente, queryParams);

        // 3. Actualizar email del usuario
        await db.promise().query(`
            UPDATE usuarios
            SET email = ?
            WHERE id_usuarios = ?
        `, [email, usuario_id]);

        // 4. Insertar o actualizar el rol del usuario
        const [rolRows] = await db.promise().query(`
            SELECT * FROM rol_por_usuario WHERE id_usuarios = ?
        `, [usuario_id]);

        if (rolRows.length > 0) {
            await db.promise().query(`
                UPDATE rol_por_usuario
                SET id_rol = ?
                WHERE id_usuarios = ?
            `, [rol, usuario_id]);
        } else {
            await db.promise().query(`
                INSERT INTO rol_por_usuario (id_usuarios, id_rol)
                VALUES (?, ?)
            `, [usuario_id, rol]);
        }

        // ✅ Mensaje de éxito
        req.session.mensajeExito = 'Paciente actualizado correctamente';
        res.redirect('/admin');

    } catch (err) {
        console.error("❌ Error al editar paciente:", err);
        res.status(500).send("Error al actualizar paciente");
    }
};



const cambiarImagenPrincipal = (req, res) => {
    if (!req.file) {
      return res.status(400).send("No se subió ninguna imagen");
    }
  
    const nuevaRuta = path.join(__dirname, '../public/img/ccc.jfif');
  
    fs.rename(req.file.path, nuevaRuta, (err) => {
      if (err) {
        console.error('Error al reemplazar la imagen:', err);
        return res.status(500).send('Error al subir la imagen');
      }
      res.redirect('/admin/imagenes');
    });
  };


module.exports = {
    mostrarPacientes,
    mostrarFormularioEditar,
    editarPaciente,
    cambiarImagenPrincipal
};

