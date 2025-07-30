const express = require('express');
const router = express.Router();
const petController = require('../controllers/pets.controller');

// Rutas CRUD básicas
router.get('/', petController.getPets);
router.get('/:id', petController.getPetById);
router.post('/', petController.createPet);
router.put('/:id', petController.updatePet);
router.delete('/:id', petController.deletePet);

// Rutas de búsqueda y filtros
router.get('/buscar/filtros', petController.searchPets);
router.get('/zona/:zone', petController.searchByZone);

// Rutas de estadísticas
router.get('/estadisticas/totales', petController.getStats);

// Rutas de estado
router.patch('/:id/estado', petController.changeStatus);

module.exports = router;
