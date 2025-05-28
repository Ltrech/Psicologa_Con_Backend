// CONFIGURAR LO QUE SERIA UN SERVIDOR CON LAS MINIMAS PRESTACIONES PARA CORRER EXPRESS
// Que este escuchando y tengamos una ruta principal "/" en el proyectoconst express = require("express");

require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const session = require('express-session');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const authRoutes = require("./routers/auth.routes");
app.use("/usuarios", authRoutes); 


app.use(session({
  secret: 'mi-super-clave-secreta',
  resave: false,
  saveUninitialized: true
}));



app.set("view engine", "ejs");
app.set("views", __dirname + "/views"); // por si no está



//LOGIN//

// Para que admin.ejs funcione
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


// Ruta para ver el html de psicologa
// Ruta para ver el html de psicologa
const path = require('path'); // ✅ Solo se declara UNA VEZ

app.get('/psicologa', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'psicologa.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});


// Ruta para ver el panel de administración
// Rutas
const adminRoutes = require('./routers/admin'); // ¡Ajustado a tu carpeta /routers!

// Otras rutas y configuraciones

const db = require('./db/db'); 

app.get('/registro', async (req, res) => {
    try {
        const [roles] = await db.promise().query('SELECT id_rol, nombre_rol FROM rol');
        res.render('registro', { roles });
    } catch (error) {
        console.error('Error obteniendo roles:', error);
        res.status(500).send('Error al cargar roles');
    }
});

app.use('/admin', require('./routers/admin'));
app.use('/uploads', express.static('uploads'));


app.use(express.static('public'));

////const usuariosRouter = require('./routers/usuarios.router');
//app.use('/usuarios', usuariosRouter);///


const pacientesRouter = require('./routers/pacientes.router');
app.use('/pacientes', pacientesRouter);

const rolRouter = require('./routers/rol.router');
app.use('/rol', rolRouter);

const rol_por_usuarioRouter = require('./routers/rol_por_usuario.router');
app.use('/rol_por_usuario', rol_por_usuarioRouter);

const hcRouter = require('./routers/historia_clinica.router');
app.use('/historia_clinica', hcRouter);
app.use('/', hcRouter);

const tipo_sesionRouter = require('./routers/tipo_sesion.router');
app.use('/tipo_sesion', tipo_sesionRouter);

const imagenesRoutes = require('./routers/imagenes.routes');
app.use('/api/imagenes', imagenesRoutes);



// Ruta principal
app.get("/", (req, res) => {
    res.send("Hola Psicologos");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
