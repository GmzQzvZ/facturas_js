const express = require('express');
const router = express.Router();
const db = require('../db');

// Crear factura
router.post('/', async (req, res) => {
  try {
    const { cliente, fecha, total, detalles } = req.body;

    // Insertar factura principal
    const [factura] = await db.query(
      'INSERT INTO facturas (cliente, fecha, total) VALUES (?, ?, ?)',
      [cliente, fecha, total]
    );

    const facturaId = factura.insertId;

    // Insertar productos
    for (const item of detalles) {
      // Buscar el nombre del producto desde la tabla productos
      const [producto] = await db.query(
        'SELECT nombre FROM productos WHERE id = ?',
        [item.producto_id]
      );

      if (!producto.length) continue; // Si el producto no existe, omitir

      await db.query(
        'INSERT INTO detalle_factura (factura_id, descripcion, cantidad, precio) VALUES (?, ?, ?, ?)',
        [facturaId, producto[0].nombre, item.cantidad, item.precio]
      );
    }

    res.json({ message: 'Factura registrada correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar factura' });
  }
});

// Obtener todas las facturas con sus productos
router.get('/', async (req, res) => {
  try {
    const [facturas] = await db.query('SELECT * FROM facturas');
    const results = [];

    for (const factura of facturas) {
      const [detalles] = await db.query(
        'SELECT descripcion, cantidad, precio FROM detalle_factura WHERE factura_id = ?',
        [factura.id]
      );

      results.push({
        ...factura,
        productos: detalles
      });
    }

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener facturas' });
  }
});

module.exports = router;
