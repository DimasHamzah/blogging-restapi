const express = require('express');
const router = express.Router();
const { index } = require('../app/controllers/CategoriesController');

router.get('/categories', index);

module.exports = router;
