const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Pet = sequelize.define('Pet', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 100]
    }
  },
  species: {
    type: DataTypes.ENUM('dog', 'cat', 'bird', 'other'),
    allowNull: false,
    defaultValue: 'other'
  },
  breed: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  color: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  size: {
    type: DataTypes.ENUM('small', 'medium', 'large'),
    allowNull: true
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
      max: 30
    }
  },
  zone: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('lost', 'found', 'adopted'),
    allowNull: false,
    defaultValue: 'lost'
  },
  contact: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  image_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isUrl: true
    }
  }
}, {
  tableName: 'pets',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['zone']
    },
    {
      fields: ['status']
    },
    {
      fields: ['species']
    }
  ]
});

module.exports = Pet; 