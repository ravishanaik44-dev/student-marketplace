const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Offer = sequelize.define('Offer', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: { min: 1 }
  },
  message: { type: DataTypes.STRING }
});

module.exports = Offer;