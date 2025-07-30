class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  /**
   * Crear un nuevo registro
   * @param {Object} data - Datos a crear
   * @returns {Promise<Object>} Registro creado
   */
  async create(data) {
    try {
      const result = await this.model.create(data);
      return result;
    } catch (error) {
      throw new Error(`Error al crear: ${error.message}`);
    }
  }

  /**
   * Buscar por ID
   * @param {number} id - ID del registro
   * @returns {Promise<Object|null>} Registro encontrado
   */
  async findById(id) {
    try {
      const result = await this.model.findByPk(id);
      return result;
    } catch (error) {
      throw new Error(`Error al buscar por ID: ${error.message}`);
    }
  }

  /**
   * Buscar todos los registros
   * @param {Object} options - Opciones de consulta (where, order, limit, offset)
   * @returns {Promise<Array>} Lista de registros
   */
  async findAll(options = {}) {
    try {
      const result = await this.model.findAll(options);
      return result;
    } catch (error) {
      throw new Error(`Error al buscar todos: ${error.message}`);
    }
  }

  /**
   * Buscar un registro con condiciones
   * @param {Object} where - Condiciones de búsqueda
   * @returns {Promise<Object|null>} Registro encontrado
   */
  async findOne(where) {
    try {
      const result = await this.model.findOne({ where });
      return result;
    } catch (error) {
      throw new Error(`Error al buscar uno: ${error.message}`);
    }
  }

  /**
   * Actualizar un registro
   * @param {number} id - ID del registro
   * @param {Object} data - Datos a actualizar
   * @returns {Promise<Object>} Registro actualizado
   */
  async update(id, data) {
    try {
      const record = await this.model.findByPk(id);
      if (!record) {
        throw new Error('Registro no encontrado');
      }
      
      await record.update(data);
      return record;
    } catch (error) {
      throw new Error(`Error al actualizar: ${error.message}`);
    }
  }

  /**
   * Eliminar un registro
   * @param {number} id - ID del registro
   * @returns {Promise<boolean>} True si se eliminó correctamente
   */
  async delete(id) {
    try {
      const record = await this.model.findByPk(id);
      if (!record) {
        throw new Error('Registro no encontrado');
      }
      
      await record.destroy();
      return true;
    } catch (error) {
      throw new Error(`Error al eliminar: ${error.message}`);
    }
  }

  /**
   * Contar registros
   * @param {Object} where - Condiciones de búsqueda
   * @returns {Promise<number>} Número de registros
   */
  async count(where = {}) {
    try {
      const result = await this.model.count({ where });
      return result;
    } catch (error) {
      throw new Error(`Error al contar: ${error.message}`);
    }
  }

  /**
   * Buscar con paginación
   * @param {Object} options - Opciones de paginación
   * @returns {Promise<Object>} Resultados paginados
   */
  async findAndCountAll(options = {}) {
    try {
      const result = await this.model.findAndCountAll(options);
      return result;
    } catch (error) {
      throw new Error(`Error en búsqueda paginada: ${error.message}`);
    }
  }
}

module.exports = BaseRepository; 