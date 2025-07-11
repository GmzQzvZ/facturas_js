const mysql = require('mysql2/promise');
const fs = require('fs');

(async () => {
  try {
    const db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'crm'
    });

    const [tablas] = await db.query(`SHOW TABLES`);
    const nombreColumna = Object.keys(tablas[0])[0];

    const exportacion = {};

    for (const fila of tablas) {
      const nombreTabla = fila[nombreColumna];
      const [datos] = await db.query(`SELECT * FROM \`${nombreTabla}\``);
      exportacion[nombreTabla] = datos;
    }

    fs.writeFileSync('base_de_datos.json', JSON.stringify(exportacion, null, 2), 'utf8');
    console.log('✅ Exportación completada: base_de_datos.json');
    db.end();
  } catch (err) {
    console.error('❌ Error al exportar:', err);
  }
})();
