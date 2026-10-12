const { Offer, Item, User } = require('../models');

exports.createOffer = async (req, res) => {
  try {
    const item = await Item.findByPk(req.body.ItemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    const offer = await Offer.create(req.body);
    res.status(201).json(offer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getOffersByItem = async (req, res) => {
  try {
    const offers = await Offer.findAll({
      where: { ItemId: req.params.itemId },
      include: [{ model: User, as: 'buyer', attributes: ['id', 'name'] }]
    });
    res.status(200).json(offers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findByPk(req.params.id);
    if (!offer) return res.status(404).json({ message: 'Offer not found' });
    await offer.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};