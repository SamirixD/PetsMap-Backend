const BaseRepository = require('./BaseRepository');
const Pet = require('../models/Pet');

class PetRepository extends BaseRepository {
  constructor() {
    super(Pet);
  }

  /**
   * Buscar mascotas por zona
   * @param {string} zone - Zona de búsqueda
   * @returns {Promise<Array>} Lista de mascotas en la zona
   */
  async findByZone(zone) {
    try {
      const pets = await this.model.findAll({
        where: { zone },
        order: [['created_at', 'DESC']]
      });
      return pets;
    } catch (error) {
      throw new Error(`Error al buscar por zona: ${error.message}`);
    }
  }

  /**
   * Buscar mascotas por estado
   * @param {string} status - Estado de la mascota (lost, found, adopted)
   * @returns {Promise<Array>} Lista de mascotas con el estado
   */
  async findByStatus(status) {
    try {
      const pets = await this.model.findAll({
        where: { status },
        order: [['created_at', 'DESC']]
      });
      return pets;
    } catch (error) {
      throw new Error(`Error al buscar por estado: ${error.message}`);
    }
  }

  /**
   * Buscar mascotas por especie
   * @param {string} species - Especie de la mascota
   * @returns {Promise<Array>} Lista de mascotas de la especie
   */
  async findBySpecies(species) {
    try {
      const pets = await this.model.findAll({
        where: { species },
        order: [['created_at', 'DESC']]
      });
      return pets;
    } catch (error) {
      throw new Error(`Error al buscar por especie: ${error.message}`);
    }
  }

  /**
   * Buscar mascotas con filtros múltiples
   * @param {Object} filters - Filtros de búsqueda
   * @param {Object} pagination - Opciones de paginación
   * @returns {Promise<Object>} Resultados paginados con filtros
   */
  async findByFilters(filters = {}, pagination = {}) {
    try {
      const { page = 1, limit = 10 } = pagination;
      const offset = (page - 1) * limit;

      // Construir condiciones de búsqueda
      const where = {};
      
      if (filters.zone) {
        where.zone = filters.zone;
      }
      
      if (filters.status) {
        where.status = filters.status;
      }
      
      if (filters.species) {
        where.species = filters.species;
      }
      
      if (filters.size) {
        where.size = filters.size;
      }

      const result = await this.model.findAndCountAll({
        where,
        order: [['created_at', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      return {
        pets: result.rows,
        total: result.count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(result.count / limit)
      };
    } catch (error) {
      throw new Error(`Error en búsqueda con filtros: ${error.message}`);
    }
  }

  /**
   * Buscar mascotas perdidas recientes
   * @param {number} days - Número de días hacia atrás
   * @returns {Promise<Array>} Lista de mascotas perdidas recientes
   */
  async findRecentLost(days = 7) {
    try {
      const date = new Date();
      date.setDate(date.getDate() - days);

      const pets = await this.model.findAll({
        where: {
          status: 'lost',
          created_at: {
            [require('sequelize').Op.gte]: date
          }
        },
        order: [['created_at', 'DESC']]
      });
      
      return pets;
    } catch (error) {
      throw new Error(`Error al buscar mascotas perdidas recientes: ${error.message}`);
    }
  }

  /**
   * Obtener estadísticas de mascotas
   * @returns {Promise<Object>} Estadísticas de mascotas
   */
  async getStats() {
    try {
      const stats = await this.model.findAll({
        attributes: [
          'status',
          [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'count']
        ],
        group: ['status']
      });

      const total = await this.count();
      
      return {
        total,
        byStatus: stats.reduce((acc, stat) => {
          acc[stat.status] = parseInt(stat.dataValues.count);
          return acc;
        }, {})
      };
    } catch (error) {
      throw new Error(`Error al obtener estadísticas: ${error.message}`);
    }
  }
}

module.exports = PetRepository; 