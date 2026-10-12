const router = require('express').Router();
const c = require('../controllers/offerController');

router.post('/', c.createOffer);
router.get('/item/:itemId', c.getOffersByItem);
router.delete('/:id', c.deleteOffer);

module.exports = router;