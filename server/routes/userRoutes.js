const router = require('express').Router();
const c = require('../controllers/userController');

router.get('/', c.getUsers);
router.post('/', c.createUser);

module.exports = router;