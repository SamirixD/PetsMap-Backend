# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a PetsMap-Backend! 

## 📋 Proceso de Contribución

### 1. Fork del repositorio
1. Ve al repositorio en GitHub
2. Haz clic en "Fork" en la esquina superior derecha
3. Clona tu fork localmente:
```bash
git clone https://github.com/tu-usuario/PetsMap-Backend.git
cd PetsMap-Backend
```

### 2. Crear una rama
```bash
git checkout -b feature/nombre-de-tu-feature
# o
git checkout -b fix/nombre-del-fix
```

### 3. Hacer cambios
- Escribe tu código
- Sigue las convenciones del proyecto
- Agrega tests si es necesario
- Actualiza la documentación

### 4. Commit y Push
```bash
git add .
git commit -m "feat: agregar nueva funcionalidad"
git push origin feature/nombre-de-tu-feature
```

### 5. Crear Pull Request
1. Ve a tu fork en GitHub
2. Haz clic en "Compare & pull request"
3. Completa la plantilla de PR
4. Envía el PR

## 📝 Convenciones de Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Documentación
- `style:` Formato de código
- `refactor:` Refactoring
- `test:` Tests
- `chore:` Tareas de mantenimiento

## 🧪 Testing

Antes de enviar tu PR:
```bash
npm test
npm run lint
```

## 📚 Recursos

- [Documentación de la API](./README.md)
- [Issues abiertos](https://github.com/original-repo/PetsMap-Backend/issues)
- [Discusiones](https://github.com/original-repo/PetsMap-Backend/discussions) 