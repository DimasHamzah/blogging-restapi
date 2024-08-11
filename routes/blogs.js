const express = require('express');
const router = express.Router();
const { index, show } = require('../app/controllers/BlogsController');

router.get('/blog', index);
router.get('/blog/:slug', show);
module.exports = router;