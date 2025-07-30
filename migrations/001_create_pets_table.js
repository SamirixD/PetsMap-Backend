'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      species: {
        type: Sequelize.ENUM('dog', 'cat', 'bird', 'other'),
        allowNull: false,
        defaultValue: 'other'
      },
      breed: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      color: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      size: {
        type: Sequelize.ENUM('small', 'medium', 'large'),
        allowNull: true
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      zone: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('lost', 'found', 'adopted'),
        allowNull: false,
        defaultValue: 'lost'
      },
      contact: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      image_url: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Crear índices
    await queryInterface.addIndex('pets', ['zone']);
    await queryInterface.addIndex('pets', ['status']);
    await queryInterface.addIndex('pets', ['species']);
    await queryInterface.addIndex('pets', ['created_at']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pets');
  }
}; 