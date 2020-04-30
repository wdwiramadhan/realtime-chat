const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

router.get('/', user.index);

module.exports = router