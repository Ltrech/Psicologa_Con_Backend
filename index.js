// CONFIGURAR LO QUE SERIA UN SERVIDOR CON LAS MINIMAS PRESTACIONES PARA CORRER EXPRESS
// Que este escuchando y tengamos una ruta principal "/" en el proyectoconst express = require("express");

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const methodOverride = require('method-override');
app.use(methodOverride('_method')); // ✅ Mover más arriba

const session = require('express-session');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(session({
  secret: 'mi-super-clave-secreta',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static('uploads'));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

const path = require('path');

// Middleware listos ✅
// A PARTIR DE AQUÍ LAS RUTAS:

const serviciosRoutes = require('./routers/servicios.routes');
app.use('/servicios', serviciosRoutes);


const authRoutes = require("./routers/auth.routes");
app.use("/usuarios", authRoutes);

const adminRoutes = require('./routers/admin');
app.use('/admin', adminRoutes);

const pacientesRouter = require('./routers/pacientes.router');
app.use('/pacientes', pacientesRouter);

const rolRouter = require('./routers/rol.router');
app.use('/rol', rolRouter);

const rol_por_usuarioRouter = require('./routers/rol_por_usuario.router');
app.use('/rol_por_usuario', rol_por_usuarioRouter);

const hcRouter = require('./routers/historia_clinica.router');
app.use('/historia_clinica', hcRouter); // 👈 Tu formulario DELETE apunta acá

const tipo_sesionRouter = require('./routers/tipo_sesion.router');
app.use('/tipo_sesion', tipo_sesionRouter);

const imagenesRoutes = require('./routers/imagenes.routes');
app.use('/imagenes_inicio', imagenesRoutes);

const fs = require('fs');
app.use('/uploads', (req, res, next) => {
  const filePath = path.join(__dirname, 'uploads', req.path);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.sendFile(path.join(__dirname, 'public', 'img', 'default.jpg'));
    } else {
      next();
    }
  });
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.static('public'));

// Rutas HTML estáticas
app.get('/psicologa', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'psicologa.html'));
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Renderizar registro con roles
const db = require('./db/db');

app.get('/api/servicios', (req, res) => {
  db.query('SELECT * FROM servicios', (err, servicios) => {
    if (err) {
      console.error('Error al obtener servicios:', err);
      return res.status(500).json({ error: 'Error al obtener servicios' });
    }

    res.json(servicios);
  });
});


app.get('/registro', async (req, res) => {
  try {
    const [roles] = await db.promise().query('SELECT id_rol, nombre_rol FROM rol');
    res.render('registro', { roles });
  } catch (error) {
    console.error('Error obteniendo roles:', error);
    res.status(500).send('Error al cargar roles');
  }
});

// Ruta principal
app.get("/", (req, res) => {
  res.send("Hola Psicologos");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
