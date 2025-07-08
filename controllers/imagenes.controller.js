
const path = require('path');
const fs = require('fs');
const db = require('../db/db');

// Mostrar vista con todas las imágenes
const renderAdminImagenes = (req, res) => {
    const sql = 'SELECT * FROM imagenes_inicio';

    db.query(sql, (err, resultados) => {
        if (err) {
            console.error('Error al obtener imágenes:', err);
            return res.status(500).send('Error al obtener imágenes');
        }

        // Aquí le pasás `imagenes` a tu EJS
        res.render('admin_imagenes', { imagenes: resultados });
    });
};

// Subir nueva
const subirImagen = (req, res) => {
  const imagen = req.file.filename;

  // Eliminar cualquier imagen anterior tipo 'principal'
  const eliminarSQL = "DELETE FROM imagenes_inicio WHERE tipo = 'principal'";
  db.query(eliminarSQL, (err) => {
    if (err) return res.status(500).send('Error al eliminar imagen anterior');

    // Insertar nueva imagen como principal
    const insertarSQL = "INSERT INTO imagenes_inicio (tipo, nombre_img) VALUES (?, ?)";
    db.query(insertarSQL, ['principal', imagen], (err2) => {
      if (err2) return res.status(500).send('Error al guardar imagen');
      res.redirect('/imagenes_inicio/admin');
    });
  });
};


// Editar (reemplazar imagen)
const editarImagen = (req, res) => {
  const id = req.params.id;
  const nuevoArchivo = req.file ? req.file.filename : null;

  if (!nuevoArchivo) {
    return res.status(400).send('No se subió una nueva imagen');
  }

  db.query('SELECT nombre_img FROM imagenes_inicio WHERE id_imagen = ?', [id], (err, resultados) => {
    if (err || resultados.length === 0) return res.status(500).send('Error al buscar imagen');

    const imagenVieja = resultados[0].nombre_img;
    const pathViejo = path.join(__dirname, '../uploads/', imagenVieja);

    fs.unlink(pathViejo, (err) => {
      if (err) console.warn('No se pudo borrar imagen anterior:', err);
    });

    db.query('UPDATE imagenes_inicio SET nombre_img = ? WHERE id_imagen = ?', [nuevoArchivo, id], (err) => {
      if (err) return res.status(500).send('Error al actualizar imagen');
      res.redirect('/imagenes_inicio/admin');
    });
  });
};


// Eliminar imagen
const eliminarImagen = (req, res) => {
  const id = req.params.id;

  db.query('SELECT nombre_img FROM imagenes_inicio WHERE id_imagen = ?', [id], (err, resultados) => {
    if (err || resultados.length === 0) return res.status(500).send('Error al buscar imagen');

    const imagen = resultados[0].nombre_img;

    // Solo intentar eliminar archivo si hay un nombre de imagen válido
    if (imagen) {
      const ruta = path.join(__dirname, '../uploads/', imagen);

      fs.unlink(ruta, (err) => {
        if (err && err.code !== 'ENOENT') { // ENOENT = archivo no encontrado, no es crítico
          console.warn('Error al borrar archivo:', err);
        }
      });
    }

    // Borrar el registro de la base de datos
    db.query('DELETE FROM imagenes_inicio WHERE id_imagen = ?', [id], (err) => {
      if (err) return res.status(500).send('Error al eliminar imagen');
      res.redirect('/imagenes_inicio/admin');
    });
  });
};


const obtenerImagenesPublicas = (req, res) => {
  const sql = 'SELECT * FROM imagenes_inicio';

  db.query(sql, (err, resultados) => {
    if (err) {
      console.error('Error al obtener imágenes:', err);
      return res.status(500).json({ error: 'Error al obtener imágenes' });
    }

    res.json(resultados);
  });
};

const guardarFrase = (req, res) => {
  const { frase1, frase2 } = req.body;

  const eliminarSQL = "DELETE FROM imagenes_inicio WHERE tipo = 'frase'";
  db.query(eliminarSQL, (err) => {
    if (err) return res.status(500).send('Error al eliminar frases anteriores');

    const insertarSQL = "INSERT INTO imagenes_inicio (tipo, frase) VALUES (?, ?)";
    db.query(insertarSQL, ['frase', frase1], (err1) => {
      if (err1) return res.status(500).send('Error al guardar frase 1');
      db.query(insertarSQL, ['frase', frase2], (err2) => {
        if (err2) return res.status(500).send('Error al guardar frase 2');
        res.redirect('/imagenes_inicio/admin');
      });
    });
  });
};




const listarContenido = (req, res) => {
  const sql = 'SELECT * FROM imagenes_inicio';
  db.query(sql, (err, resultados) => {
    if (err) return res.status(500).send('Error al obtener imágenes/frases');
    res.json(resultados);
  });
};


module.exports = {
  renderAdminImagenes,
  subirImagen,
  editarImagen,
  eliminarImagen,
  obtenerImagenesPublicas,
  guardarFrase,
  listarContenido
};
