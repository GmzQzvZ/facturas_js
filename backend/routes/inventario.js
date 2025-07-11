const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const [productos] = await db.query('SELECT * FROM productos');
    res.json(productos);
  } catch (err) {
    console.error('Error al obtener productos:', err);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});


// Crear producto
router.post('/', (req, res) => {
  const { nombre, descripcion, cantidad, precio } = req.body;
  if (!nombre || !precio) {
    return res.status(400).json({ error: 'Nombre y precio son obligatorios' });
  }

  const sql = 'INSERT INTO productos (nombre, descripcion, cantidad, precio) VALUES (?, ?, ?, ?)';
  db.query(sql, [nombre, descripcion, cantidad, precio], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al guardar el producto' });
    res.status(201).json({ message: 'Producto creado' });
  });
});

// Eliminar producto
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM productos WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar' });
    res.json({ message: 'Producto eliminado' });
  });
});

module.exports = router;
