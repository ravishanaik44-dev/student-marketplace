const sequelize = require('../config/db');
const User = require('./User');
const Item = require('./Item');
const Offer = require('./Offer');

// One user lists many items
User.hasMany(Item, { foreignKey: 'UserId', onDelete: 'CASCADE' });
Item.belongsTo(User, { foreignKey: 'UserId', as: 'seller' });

// One item receives many offers
Item.hasMany(Offer, { foreignKey: 'ItemId', onDelete: 'CASCADE' });
Offer.belongsTo(Item, { foreignKey: 'ItemId' });

// One user makes many offers
User.hasMany(Offer, { foreignKey: 'UserId' });
Offer.belongsTo(User, { foreignKey: 'UserId', as: 'buyer' });

module.exports = { sequelize, User, Item, Offer };