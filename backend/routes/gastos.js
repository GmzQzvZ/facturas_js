const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los gastos
router.get('/', async (req, res) => {
  try {
    const [gastos] = await db.query('SELECT * FROM gastos ORDER BY fecha DESC');
    res.json(gastos);
  } catch (err) {
    console.error('Error al obtener gastos:', err);
    res.status(500).json({ error: 'Error al obtener gastos' });
  }
});

// Crear gasto
router.post('/', async (req, res) => {
  const { descripcion, monto, fecha, categoria, observaciones } = req.body;
  if (!descripcion || !monto || !fecha) {
    return res.status(400).json({ error: 'Descripción, monto y fecha son obligatorios' });
  }

  try {
    await db.query(
      'INSERT INTO gastos (descripcion, monto, fecha, categoria, observaciones) VALUES (?, ?, ?, ?, ?)',
      [descripcion, monto, fecha, categoria, observaciones]
    );
    res.status(201).json({ message: 'Gasto registrado correctamente' });
  } catch (err) {
    console.error('Error al guardar el gasto:', err);
    res.status(500).json({ error: 'Error al guardar el gasto' });
  }
});

module.exports = router;
