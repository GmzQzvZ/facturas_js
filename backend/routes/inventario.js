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
router.post('/', async (req, res) => {
  const { nombre, descripcion, cantidad, precio } = req.body;
  if (!nombre || !precio) {
    return res.status(400).json({ error: 'Nombre y precio son obligatorios' });
  }

  try {
    await db.query(
      'INSERT INTO productos (nombre, descripcion, cantidad, precio) VALUES (?, ?, ?, ?)',
      [nombre, descripcion, cantidad, precio]
    );
    res.status(201).json({ message: 'Producto creado correctamente' });
  } catch (err) {
    console.error('Error al guardar producto:', err);
    res.status(500).json({ error: 'Error al guardar producto' });
  }
});

// ✅ Actualizar producto
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, cantidad, precio } = req.body;

  try {
    await db.query(
      'UPDATE productos SET nombre = ?, descripcion = ?, cantidad = ?, precio = ? WHERE id = ?',
      [nombre, descripcion, cantidad, precio, id]
    );
    res.json({ message: 'Producto actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar producto:', err);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

// Eliminar producto
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await db.query('DELETE FROM productos WHERE id = ?', [id]);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar producto:', err);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

module.exports = router;
