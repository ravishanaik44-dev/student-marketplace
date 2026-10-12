const router = require('express').Router();
const c = require('../controllers/itemController');

// Special routes must come BEFORE '/:id'
router.get('/search', c.searchItems);
router.get('/top-offers', c.itemsWithTopOffer);

router.get('/', c.getAllItems);
router.get('/:id', c.getItem);
router.post('/', c.createItem);
router.put('/:id', c.updateItem);
router.delete('/:id', c.deleteItem);

module.exports = router;