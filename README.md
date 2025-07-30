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

## 🗄️ Configuración de la base de datos

### Requisitos
- MySQL 8.0 o superior
- Node.js 16 o superior

### Configuración inicial
1. **Crear la base de datos:**
```sql
CREATE DATABASE petsmap_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. **Configurar variables de entorno:**
```bash
cp .env.example .env
# Editar .env con tus credenciales de MySQL
```

## 📡 API Endpoints

### Mascotas

#### CRUD Básico
- `GET /api/mascotas` → Lista todas las mascotas (con paginación)
- `GET /api/mascotas/:id` → Obtiene una mascota por ID
- `POST /api/mascotas` → Crea una nueva mascota
- `PUT /api/mascotas/:id` → Actualiza una mascota
- `DELETE /api/mascotas/:id` → Elimina una mascota

#### Búsqueda y Filtros
- `GET /api/mascotas/buscar/filtros` → Busca con filtros (zona, estado, especie, tamaño)
- `GET /api/mascotas/zona/:zona` → Busca mascotas por zona

#### Estadísticas
- `GET /api/mascotas/estadisticas/totales` → Obtiene estadísticas de mascotas

#### Gestión de Estado
- `PATCH /api/mascotas/:id/estado` → Cambia el estado de una mascota

### Parámetros de consulta
- `page` - Número de página (default: 1)
- `limit` - Elementos por página (default: 10)
- `zona` - Filtrar por zona
- `estado` - Filtrar por estado (perdido, encontrado, adoptado)
- `especie` - Filtrar por especie (perro, gato, ave, otro)
- `tamanio` - Filtrar por tamaño (pequeno, mediano, grande)

## 📊 Estructura de datos

### Mascota
```json
{
  "id": 1,
  "nombre": "Firulais",
  "especie": "perro",
  "raza": "Golden Retriever",
  "color": "Dorado",
  "tamanio": "grande",
  "edad": 3,
  "zona": "Zona Sur",
  "direccion": "Calle Principal 123",
  "descripcion": "Perro muy amigable",
  "estado": "perdido",
  "contacto": "+1234567890",
  "imagen_url": "https://ejemplo.com/imagen.jpg",
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

## ⚙️ Variables de entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto del servidor | `3000` |
| `NODE_ENV` | Entorno de ejecución | `development` |
| `DB_HOST` | Host de MySQL | `localhost` |
| `DB_PORT` | Puerto de MySQL | `3306` |
| `DB_NAME` | Nombre de la base de datos | `petsmap_db` |
| `DB_USER` | Usuario de MySQL | `root` |
| `DB_PASSWORD` | Contraseña de MySQL | - |

## 🔧 Scripts disponibles

- `npm start` - Ejecuta en modo producción
- `npm run dev` - Ejecuta en modo desarrollo con nodemon

## 🏗️ Arquitectura

El proyecto sigue el patrón **Repository-Service-Controller**:

- **Models**: Definición de entidades con Sequelize
- **Repositories**: Acceso a datos y consultas específicas
- **Services**: Lógica de negocio y validaciones
- **Controllers**: Manejo de requests HTTP y responses
- **Routes**: Definición de endpoints de la API
