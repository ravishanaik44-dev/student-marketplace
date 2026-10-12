const { Op } = require('sequelize');
const { sequelize, Item, User } = require('../models');

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll({
      include: [{ model: User, as: 'seller', attributes: ['id', 'name', 'email'] }]
    });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id, {
      include: [{ model: User, as: 'seller', attributes: ['id', 'name', 'email'] }]
    });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    await item.update(req.body);
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    await item.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Advanced filter: /api/items/search?category=books&minPrice=100&maxPrice=500
exports.searchItems = async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;
    const where = { status: 'available' };
    if (category) where.category = category;
    if (minPrice || maxPrice) {
      where.price = { [Op.between]: [minPrice || 0, maxPrice || 999999] };
    }
    const items = await Item.findAll({ where });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Raw SQL: each item with its highest offer and number of offers
exports.itemsWithTopOffer = async (req, res) => {
  try {
    const [rows] = await sequelize.query(`
      SELECT i.id, i.title, i.price, i.status,
             MAX(o.amount) AS highestOffer,
             COUNT(o.id) AS totalOffers
      FROM Items i
      LEFT JOIN Offers o ON o.ItemId = i.id
      GROUP BY i.id, i.title, i.price, i.status
    `);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};