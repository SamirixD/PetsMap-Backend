const PetRepository = require('../repositories/PetRepository');

class PetService {
  constructor() {
    this.petRepository = new PetRepository();
  }

  /**
   * Crear una nueva mascota
   * @param {Object} petData - Datos de la mascota
   * @returns {Promise<Object>} Mascota creada
   */
  async createPet(petData) {
    try {
      // Validaciones de negocio
      if (!petData.name || !petData.zone) {
        throw new Error('Nombre y zona son obligatorios');
      }

      // Validar especie
      const validSpecies = ['dog', 'cat', 'bird', 'other'];
      if (petData.species && !validSpecies.includes(petData.species)) {
        throw new Error('Especie no válida');
      }

      // Validar estado
      const validStatuses = ['lost', 'found', 'adopted'];
      if (petData.status && !validStatuses.includes(petData.status)) {
        throw new Error('Estado no válido');
      }

      // Validar tamaño
      const validSizes = ['small', 'medium', 'large'];
      if (petData.size && !validSizes.includes(petData.size)) {
        throw new Error('Tamaño no válido');
      }

      const pet = await this.petRepository.create(petData);
      return pet;
    } catch (error) {
      throw new Error(`Error en servicio al crear mascota: ${error.message}`);
    }
  }

  /**
   * Obtener todas las mascotas con paginación
   * @param {Object} pagination - Opciones de paginación
   * @returns {Promise<Object>} Lista paginada de mascotas
   */
  async getPets(pagination = {}) {
    try {
      const pets = await this.petRepository.findByFilters({}, pagination);
      return pets;
    } catch (error) {
      throw new Error(`Error en servicio al obtener mascotas: ${error.message}`);
    }
  }

  /**
   * Obtener mascota por ID
   * @param {number} id - ID de la mascota
   * @returns {Promise<Object>} Mascota encontrada
   */
  async getPetById(id) {
    try {
      const pet = await this.petRepository.findById(id);
      if (!pet) {
        throw new Error('Mascota no encontrada');
      }
      return pet;
    } catch (error) {
      throw new Error(`Error en servicio al obtener mascota: ${error.message}`);
    }
  }

  /**
   * Actualizar mascota
   * @param {number} id - ID de la mascota
   * @param {Object} updatedData - Datos a actualizar
   * @returns {Promise<Object>} Mascota actualizada
   */
  async updatePet(id, updatedData) {
    try {
      const pet = await this.petRepository.update(id, updatedData);
      return pet;
    } catch (error) {
      throw new Error(`Error en servicio al actualizar mascota: ${error.message}`);
    }
  }

  /**
   * Eliminar mascota
   * @param {number} id - ID de la mascota
   * @returns {Promise<boolean>} True si se eliminó correctamente
   */
  async deletePet(id) {
    try {
      const result = await this.petRepository.delete(id);
      return result;
    } catch (error) {
      throw new Error(`Error en servicio al eliminar mascota: ${error.message}`);
    }
  }

  /**
   * Buscar mascotas con filtros
   * @param {Object} filters - Filtros de búsqueda
   * @param {Object} pagination - Opciones de paginación
   * @returns {Promise<Object>} Resultados filtrados y paginados
   */
  async searchPets(filters = {}, pagination = {}) {
    try {
      const result = await this.petRepository.findByFilters(filters, pagination);
      return result;
    } catch (error) {
      throw new Error(`Error en servicio al buscar mascotas: ${error.message}`);
    }
  }

  /**
   * Buscar mascotas por zona
   * @param {string} zone - Zona de búsqueda
   * @returns {Promise<Array>} Lista de mascotas en la zona
   */
  async searchByZone(zone) {
    try {
      const pets = await this.petRepository.findByZone(zone);
      return pets;
    } catch (error) {
      throw new Error(`Error en servicio al buscar por zona: ${error.message}`);
    }
  }

  /**
   * Buscar mascotas perdidas recientes
   * @param {number} days - Número de días hacia atrás
   * @returns {Promise<Array>} Lista de mascotas perdidas recientes
   */
  async findRecentLost(days = 7) {
    try {
      const pets = await this.petRepository.findRecentLost(days);
      return pets;
    } catch (error) {
      throw new Error(`Error en servicio al buscar perdidas recientes: ${error.message}`);
    }
  }

  /**
   * Obtener estadísticas
   * @returns {Promise<Object>} Estadísticas de mascotas
   */
  async getStats() {
    try {
      const stats = await this.petRepository.getStats();
      return stats;
    } catch (error) {
      throw new Error(`Error en servicio al obtener estadísticas: ${error.message}`);
    }
  }

  /**
   * Cambiar estado de mascota
   * @param {number} id - ID de la mascota
   * @param {string} newStatus - Nuevo estado
   * @returns {Promise<Object>} Mascota actualizada
   */
  async changeStatus(id, newStatus) {
    try {
      const validStatuses = ['lost', 'found', 'adopted'];
      if (!validStatuses.includes(newStatus)) {
        throw new Error('Estado no válido');
      }

      const pet = await this.petRepository.update(id, { status: newStatus });
      return pet;
    } catch (error) {
      throw new Error(`Error en servicio al cambiar estado: ${error.message}`);
    }
  }
}

module.exports = PetService; 