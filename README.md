# PetsMap Backend 🐾

Backend en Express para la app PetsMap.

## 🚀 Configuración inicial

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar variables de entorno:**
```bash
cp .env.example .env
```

3. **Editar el archivo `.env`:**
```env
PORT=3000
NODE_ENV=development
```

## 🏃‍♂️ Cómo ejecutar

### Desarrollo (con nodemon):
```bash
npm run dev
```

### Producción:
```bash
npm start
```

## 📡 Rutas disponibles

- `GET /api/mascotas` → Lista de mascotas
- `POST /api/mascotas` → Crear reporte de mascota

## ⚙️ Variables de entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto del servidor | `3000` |
| `NODE_ENV` | Entorno de ejecución | `development` |

## 🔧 Scripts disponibles

- `npm start` - Ejecuta en modo producción
- `npm run dev` - Ejecuta en modo desarrollo con nodemon
