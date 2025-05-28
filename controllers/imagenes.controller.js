
const path = require('path');
const fs = require('fs');

const db = require('../db/db');


const imagenesController = require('../controllers/imagenes.controller');

const obtenerImagenes = (req, res) => {
    const sql = 'SELECT * FROM imagenes'; // o por sección si usás tablas separadas
    db.query(sql, (err, resultados) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener imágenes' });
        }
        res.json(resultados);
    });
};



const subirImagen = (req, res) => {
    const { titulo, descripcion, seccion } = req.body;
    const imagen = req.file ? `/uploads/${req.file.filename}` : null;

    if (!imagen) {
        return res.status(400).json({ error: 'Debe subir una imagen' });
    }

    const sql = 'INSERT INTO imagenes (titulo, url_imagen, descripcion, seccion) VALUES (?, ?, ?, ?)';
    db.query(sql, [titulo, imagen, descripcion, seccion], (err, resultado) => {
        if (err) {
            console.error('Error al guardar imagen:', err);
            return res.status(500).json({ error: 'Error al guardar la imagen' });
        }
        res.redirect('/admin'); // o donde quieras
    });
};

module.exports = {
    obtenerImagenes,
    subirImagen
};



