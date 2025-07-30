const PetService = require('../services/PetService');

class PetController {
  constructor() {
    this.petService = new PetService();
  }

  /**
   * Obtener todas las mascotas
   */
  getPets = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const pagination = { page: parseInt(page), limit: parseInt(limit) };
      
      const result = await this.petService.getPets(pagination);
      
      res.json({
        success: true,
        data: result.pets,
        pagination: {
          page: result.page,
          limit: result.limit,
          total: result.total,
          totalPages: result.totalPages
        }
      });
    } catch (error) {
      console.error('Error en getPets:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener mascotas',
        error: error.message
      });
    }
  };

  /**
   * Obtener mascota por ID
   */
  getPetById = async (req, res) => {
    try {
      const { id } = req.params;
      const pet = await this.petService.getPetById(parseInt(id));
      
      res.json({
        success: true,
        data: pet
      });
    } catch (error) {
      console.error('Error en getPetById:', error);
      
      if (error.message.includes('no encontrada')) {
        return res.status(404).json({
          success: false,
          message: 'Mascota no encontrada'
        });
      }
      
      res.status(500).json({
        success: false,
        message: 'Error al obtener mascota',
        error: error.message
      });
    }
  };

  /**
   * Crear nueva mascota
   */
  createPet = async (req, res) => {
    try {
      const petData = req.body;
      const newPet = await this.petService.createPet(petData);
      
      res.status(201).json({
        success: true,
        message: 'Mascota creada exitosamente',
        data: newPet
      });
    } catch (error) {
      console.error('Error en createPet:', error);
      
      if (error.message.includes('obligatorios') || 
          error.message.includes('no válida') || 
          error.message.includes('no válido')) {
        return res.status(400).json({
          success: false,
          message: 'Datos inválidos',
          error: error.message
        });
      }
      
      res.status(500).json({
        success: false,
        message: 'Error al crear mascota',
        error: error.message
      });
    }
  };

  /**
   * Actualizar mascota
   */
  updatePet = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      
      const updatedPet = await this.petService.updatePet(
        parseInt(id), 
        updatedData
      );
      
      res.json({
        success: true,
        message: 'Mascota actualizada exitosamente',
        data: updatedPet
      });
    } catch (error) {
      console.error('Error en updatePet:', error);
      
      if (error.message.includes('no encontrada')) {
        return res.status(404).json({
          success: false,
          message: 'Mascota no encontrada'
        });
      }
      
      res.status(500).json({
        success: false,
        message: 'Error al actualizar mascota',
        error: error.message
      });
    }
  };

  /**
   * Eliminar mascota
   */
  deletePet = async (req, res) => {
    try {
      const { id } = req.params;
      await this.petService.deletePet(parseInt(id));
      
      res.json({
        success: true,
        message: 'Mascota eliminada exitosamente'
      });
    } catch (error) {
      console.error('Error en deletePet:', error);
      
      if (error.message.includes('no encontrada')) {
        return res.status(404).json({
          success: false,
          message: 'Mascota no encontrada'
        });
      }
      
      res.status(500).json({
        success: false,
        message: 'Error al eliminar mascota',
        error: error.message
      });
    }
  };

  /**
   * Buscar mascotas con filtros
   */
  searchPets = async (req, res) => {
    try {
      const { zone, status, species, size, page = 1, limit = 10 } = req.query;
      
      const filters = {};
      if (zone) filters.zone = zone;
      if (status) filters.status = status;
      if (species) filters.species = species;
      if (size) filters.size = size;
      
      const pagination = { page: parseInt(page), limit: parseInt(limit) };
      const result = await this.petService.searchPets(filters, pagination);
      
      res.json({
        success: true,
        data: result.pets,
        pagination: {
          page: result.page,
          limit: result.limit,
          total: result.total,
          totalPages: result.totalPages
        }
      });
    } catch (error) {
      console.error('Error en searchPets:', error);
      res.status(500).json({
        success: false,
        message: 'Error al buscar mascotas',
        error: error.message
      });
    }
  };

  /**
   * Buscar mascotas por zona
   */
  searchByZone = async (req, res) => {
    try {
      const { zone } = req.params;
      const pets = await this.petService.searchByZone(zone);
      
      res.json({
        success: true,
        data: pets
      });
    } catch (error) {
      console.error('Error en searchByZone:', error);
      res.status(500).json({
        success: false,
        message: 'Error al buscar mascotas por zona',
        error: error.message
      });
    }
  };

  /**
   * Obtener estadísticas
   */
  getStats = async (req, res) => {
    try {
      const stats = await this.petService.getStats();
      
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('Error en getStats:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener estadísticas',
        error: error.message
      });
    }
  };

  /**
   * Cambiar estado de mascota
   */
  changeStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({
          success: false,
          message: 'Estado es requerido'
        });
      }
      
      const pet = await this.petService.changeStatus(parseInt(id), status);
      
      res.json({
        success: true,
        message: 'Estado actualizado exitosamente',
        data: pet
      });
    } catch (error) {
      console.error('Error en changeStatus:', error);
      
      if (error.message.includes('no válido')) {
        return res.status(400).json({
          success: false,
          message: 'Estado no válido'
        });
      }
      
      res.status(500).json({
        success: false,
        message: 'Error al cambiar estado',
        error: error.message
      });
    }
  };
}

module.exports = new PetController();
