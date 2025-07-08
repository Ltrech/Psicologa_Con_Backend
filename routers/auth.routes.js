

const express = require("express");
const router = express.Router();
const path = require("path");

// CONTROLADORES
const { methods: authController } = require("../controllers/authentication.controller");

// MIDDLEWARE
const authorization = require("../middlewares/authorization");

// --- RUTAS DE AUTENTICACIÓN ---


// Página de login (HTML o render EJS, elegí solo UNA)
router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html")); 
});

// Procesar inicio de sesión
router.post("/login", authController.login);

// Cerrar sesión
router.post("/logout", (req, res) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: false, // Cambiar a true si usás HTTPS en producción
        sameSite: "Lax",
        path: "/"      // Muy importante que coincida con la cookie original
    });

   
    res.redirect('/psicologa')
    
});

// Cerrar sesión
router.post("/logout", authController.logout);


// Obtener datos del perfil (requiere estar logueado)
router.get("/perfil", authorization, authController.verPerfil);

// EXPORTAR
module.exports = router;
