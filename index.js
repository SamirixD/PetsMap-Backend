// Cargar variables de entorno
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
const logger = require('./middleware/logger');
app.use(logger);
app.use(cors());
app.use(express.json());

// Rutas
const mascotasRoutes = require('./routes/mascotas.routes');
app.use('/api/mascotas', mascotasRoutes);

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en modo ${NODE_ENV}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`⏰ Iniciado: ${new Date().toLocaleString()}`);
});
