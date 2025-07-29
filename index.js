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
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
