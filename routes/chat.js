const express = require('express');
const router = express.Router();
const chat = require('../controllers/chat');

router.get('/', chat.index);
router.post('/', chat.store);
router.get('/:id',chat.show);

module.exports = router;