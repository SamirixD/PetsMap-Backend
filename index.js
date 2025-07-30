// Cargar variables de entorno
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { testConnection, syncDatabase } = require('./config/db');
const app = express();

// Middleware
const logger = require('./middleware/logger');
app.use(logger);
app.use(cors());
app.use(express.json());

// Rutas
const petsRoutes = require('./routes/pets.routes');
app.use('/api/pets', petsRoutes);

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Inicializar servidor
const startServer = async () => {
  try {
    // Probar conexión a la base de datos
    await testConnection();
    
    // Sincronizar modelos (crear tablas si no existen)
    await syncDatabase();
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en modo ${NODE_ENV}`);
      console.log(`📍 URL: http://localhost:${PORT}`);
      console.log(`⏰ Iniciado: ${new Date().toLocaleString()}`);
      console.log(`🗄️  Base de datos conectada`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();
