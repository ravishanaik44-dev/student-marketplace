 const { DataTypes } = require('sequelize');
   const sequelize = require('../config/db');

   const Item = sequelize.define('Item', {
     title: { type: DataTypes.STRING, allowNull: false },
     description: { type: DataTypes.TEXT },
     price: {
       type: DataTypes.FLOAT,
       allowNull: false,
       validate: { min: 1 }
     },
     category: { type: DataTypes.STRING, allowNull: false },
     status: {
       type: DataTypes.ENUM('available', 'sold'),
       defaultValue: 'available'
     }
   });

   module.exports = Item;