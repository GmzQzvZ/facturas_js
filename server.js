const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend')));

// Rutas
app.use('/api/auth', require('./backend/routes/auth'));
app.use('/api/inventario', require('./backend/routes/inventario'));
app.use('/api/facturas', require('./backend/routes/invoices'));
app.use('/api/gastos', require('./backend/routes/gastos'));


// Fallback a home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/home.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor activo en http://localhost:${PORT}/login.html`));

app.use('/api/auth', (req, res, next) => {
  console.log('🛠️ Petición a /api/auth');
  next();
});






