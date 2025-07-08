

require('dotenv').config();

const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const db = require("../db/db"); 
const pool = require("../db/db");



async function login(req, res) {
 
  const { user: email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ status: "Error", message: "Campos incompletos" });
  }

  const sqlUsuario = `
    SELECT u.id_usuarios, u.email, u.contrasena, r.nombre_rol
    FROM usuarios u
    LEFT JOIN rol_por_usuario ru ON u.id_usuarios = ru.id_usuarios
    LEFT JOIN rol r ON ru.id_rol = r.id_rol
    WHERE u.email = ? AND u.fecha_baja IS NULL
  `;

  db.query(sqlUsuario, [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ status: "Error", message: "Error de servidor" });
    }
    
    if (results.length === 0) {
      return res.status(400).send({ status: "Error", message: "Usuario no encontrado" });
    }

    const usuario = results[0];
    const match = await bcryptjs.compare(password, usuario.contrasena);

    if (!match) {
      return res.status(400).send({ status: "Error", message: "Contraseña incorrecta" });
    }
    console.log("🔐 Clave secreta:", process.env.JWT_SECRET);


    // Generar JWT
    const token = jwt.sign(
      {
        id: usuario.id_usuarios,
        email: usuario.email,
        rol: usuario.nombre_rol || "sin rol"
      },
      process.env.JWT_SECRET, // <== Usamos la clave correcta aquí
      { expiresIn: process.env.JWT_EXPIRATION }
    );
    

    // Enviar cookie
   // Enviar cookie
const cookieOption = {
  expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
  httpOnly: true,
  secure: false,           // true si estás usando HTTPS
  sameSite: "Lax",         // ayuda a que se borre correctamente
  path: "/"                // asegúrate de usar el mismo al hacer clearCookie
};

res.cookie("jwt", token, cookieOption);


    // Redirigir según el rol
    if (usuario.nombre_rol === "Administrador") {
      return res.send({ status: "ok", redirect: "/admin" });
    } else if (usuario.nombre_rol === "Paciente") {
      
      return res.send({ status: "ok", redirect: "/psicologa" }); 

    } else {
      return res.send({ status: "ok", redirect: "/psicologa" }); 
      
      
 // Por si no tiene rol asignado
    }
  });
}

const connection = require('../db/db');  // Importamos la conexión

const verPerfil = (req, res) => {
    const userId = req.userId; // este valor lo pasa tu middleware JWT

    const sql = `
        SELECT 
            p.nombre_paciente AS nombre,
            p.apellido_paciente AS apellido,
            p.imagen,
            r.nombre_rol AS rol
        FROM usuarios u
        LEFT JOIN pacientes p ON p.usuario_id = u.id_usuarios
        INNER JOIN rol_por_usuario ru ON ru.id_usuarios = u.id_usuarios
        INNER JOIN rol r ON ru.id_rol = r.id_rol
        WHERE u.id_usuarios = ? AND u.fecha_baja IS NULL;
    `;

    connection.query(sql, [userId], (error, results) => {
        if (error) {
            console.error('Error al obtener perfil:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }

        if (results.length > 0) {
            return res.status(200).json(results[0]); // nombre, apellido, imagen, rol
        } else {
            return res.status(404).json({ message: 'Perfil no encontrado' });
        }
    });
};


const logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    path: "/"
  });

  req.session?.destroy?.(() => {
    res.redirect("/login.html"); // ✅ Redirige correctamente
  });
};


// Exportar correctamente usando module.exports
const methods = {
  login,
  verPerfil,
  logout
};

module.exports = { methods };
