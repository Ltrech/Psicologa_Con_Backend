const path = require('path');
const fs = require('fs');
const db = require('../db/db');

// Mostrar la vista con todos los servicios
const vistaAdminServicios = (req, res) => {
  const sql = 'SELECT * FROM servicios';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al obtener los servicios:', err);
      return res.status(500).send('Error al obtener los servicios');
    }

    res.render('modificar_servicios', { servicios: result });
  });
};


// Insertar nuevo servicio
const crearServicio = (req, res) => {
  const { titulo, descripcion } = req.body;
  const imagen = req.file?.filename;
  if (!imagen) {
  return res.status(400).send('No se subió ninguna imagen');
}

  const sql = 'INSERT INTO servicios (titulo, descripcion, imagen) VALUES (?, ?, ?)';
  db.query(sql, [titulo, descripcion, imagen], (err) => {
    if (err) {
      console.error('Error al insertar el servicio:', err);
      return res.status(500).send('Error al crear el servicio');
    }

    res.redirect('/servicios/admin');
  });
};


// Eliminar servicio
const eliminarServicio = (req, res) => {
  const { id } = req.params;

  const buscarSQL = 'SELECT imagen FROM servicios WHERE id_servicio = ?';
  db.query(buscarSQL, [id], (err, rows) => {
    if (err) return res.status(500).send('Error al buscar imagen');

    const servicio = rows[0];
    if (servicio) {
      const rutaImagen = path.join(__dirname, '../public/uploads', servicio.imagen);

      if (fs.existsSync(rutaImagen)) {
        fs.unlinkSync(rutaImagen);
      }

      const borrarSQL = 'DELETE FROM servicios WHERE id_servicio = ?';
      db.query(borrarSQL, [id], (err2) => {
        if (err2) return res.status(500).send('Error al eliminar el servicio');
        res.redirect('/servicios/admin');
      });
    } else {
      res.redirect('/servicios/admin');
    }
  });
};
module.exports = {
  vistaAdminServicios,
  crearServicio,
  eliminarServicio
};
