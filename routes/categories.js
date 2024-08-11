const express = require('express');
const router = express.Router();
const { index } = require('../app/controllers/CategoriesController');
const { auth } = require("../app/middleware/auth");

router.get('/categories',auth , index);

module.exports = router;
