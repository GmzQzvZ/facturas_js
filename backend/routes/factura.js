const express = require('express');
const router = express.Router();
const db = require('../db'); // conexión a MySQL

// Crear nueva factura
router.post('/', (req, res) => {
  const { cliente, fecha, total, detalles } = req.body;

  if (!cliente || !fecha || !total || !Array.isArray(detalles)) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  // Insertar factura principal
  const facturaSql = 'INSERT INTO facturas (cliente, fecha, total) VALUES (?, ?, ?)';
  db.query(facturaSql, [cliente, fecha, total], (err, result) => {
    if (err) {
      console.error('Error al guardar la factura:', err);
      return res.status(500).json({ error: 'Error al guardar la factura' });
    }

    const facturaId = result.insertId;

    // Obtener nombres de los productos desde la base de datos
    const ids = detalles.map(d => d.producto_id);
    const placeholders = ids.map(() => '?').join(',');
    const productosSql = `SELECT id, nombre FROM productos WHERE id IN (${placeholders})`;

    db.query(productosSql, ids, (err2, productos) => {
      if (err2) {
        console.error('Error al obtener productos:', err2);
        return res.status(500).json({ error: 'Error al obtener nombres de productos' });
      }

      const productosMap = {};
      productos.forEach(p => {
        productosMap[p.id] = p.nombre;
      });

      // Construir valores para detalle_factura
      const detalleSql = 'INSERT INTO detalle_factura (factura_id, descripcion, cantidad, precio) VALUES ?';
      const detalleValues = detalles.map(d => [
        facturaId,
        productosMap[d.producto_id] || `Producto ${d.producto_id}`,
        d.cantidad,
        d.precio
      ]);

      db.query(detalleSql, [detalleValues], (err3) => {
        if (err3) {
          console.error('Error al guardar detalles:', err3);
          return res.status(500).json({ error: 'Error al guardar detalles de factura' });
        }

        res.json({ message: 'Factura registrada correctamente' });
      });
    });
  });
});

module.exports = router;
