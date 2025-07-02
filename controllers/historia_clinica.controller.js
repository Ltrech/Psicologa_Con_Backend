const db = require("../db/db");

const rolControllers = require("./historia_clinica.controller");

//// METODO GET  /////



// Mostrar paciente + historia clínica
// Mostrar paciente + historia clínica
const mostrarPacienteConHistoria = (req, res) => {
    const { id_pacientes } = req.params;

    const sqlPaciente = `
        SELECT p.*, u.email
        FROM pacientes p
        JOIN usuarios u ON p.usuario_id = u.id_usuarios
        WHERE p.id_pacientes = ?
    `;

    const sqlHistoria = `
        SELECT *
        FROM historia_clinica
        WHERE id_paciente = ?
        ORDER BY fecha_registro DESC
        LIMIT 1
    `;

    // Primero obtenemos los datos del paciente
    db.query(sqlPaciente, [id_pacientes], (error, pacienteResult) => {
        if (error) {
            console.error("Error al obtener datos del paciente:", error);
            return res.status(500).send("Error interno del servidor.");
        }

        if (!pacienteResult || pacienteResult.length === 0) {
            return res.status(404).send("Paciente no encontrado.");
        }

        const paciente = pacienteResult[0];

        // Luego obtenemos la historia clínica
        db.query(sqlHistoria, [id_pacientes], (error, historiaResult) => {
            if (error) {
                console.error("Error al obtener historia clínica:", error);
                return res.status(500).send("Error interno al recuperar la historia clínica.");
            }

            const historia = historiaResult.length > 0 ? historiaResult[0] : null;

            res.render("historia_clinica", {
                paciente,
                historia
            });
        });
    });
};

const agregarHistoriaClinica = (req, res) => {
    const { id_paciente, fecha_registro, descripcion, tratamiento } = req.body;

    if (!id_paciente) {
        return res.status(400).send("Error: id_paciente es requerido.");
    }

    const sql = `
        INSERT INTO historia_clinica (id_paciente, fecha_registro, descripcion, tratamiento)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [id_paciente, fecha_registro, descripcion, tratamiento], (error, result) => {
        if (error) {
            console.error("Error al agregar historia clínica:", error);
            return res.status(500).send("Error interno al guardar la historia clínica.");
        }

         res.redirect(`/historia_clinica/paciente/${id_paciente}`);



         
    });
};



const editarHistoriaClinica = (req, res) => {
    const { id } = req.params;
    const { fecha_registro, descripcion, tratamiento } = req.body;

    const sql = `
        UPDATE historia_clinica
        SET fecha_registro = ?, descripcion = ?, tratamiento = ?
        WHERE id_hc = ?
    `;

    db.query(sql, [fecha_registro, descripcion, tratamiento, id], (error, result) => {
        if (error) {
            console.error("Error al editar historia clínica:", error);
            return res.status(500).send("Error interno al actualizar la historia clínica.");
        }

        // Para redireccionar de nuevo al paciente correspondiente, primero obtenemos su ID
        const getPacienteSQL = "SELECT id_paciente FROM historia_clinica WHERE id_hc = ?";
        db.query(getPacienteSQL, [id], (err, rows) => {
            if (err || rows.length === 0) {
                return res.redirect("/admin"); // fallback si no encuentra el paciente
            }

             const { id_paciente } = req.body;
        res.redirect(`/historia_clinica/paciente/${id_paciente}`);
        });
        
    });
};

const eliminarHistoriaClinica = (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM historia_clinica WHERE id_hc = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar historia clínica:", err);
            return res.status(500).send("Error al eliminar la historia clínica.");
        }

        res.redirect("/admin");
    });
};



module.exports = {
   
    mostrarPacienteConHistoria,
    agregarHistoriaClinica,
    editarHistoriaClinica,
    eliminarHistoriaClinica
    
    
};