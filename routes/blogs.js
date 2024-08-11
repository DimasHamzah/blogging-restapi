const express = require('express');
const router = express.Router();
const { index, show } = require('../app/controllers/BlogsController');
const { auth } = require('../app/middleware/auth');

router.get('/blog', auth ,index);
router.get('/blog/:slug',auth , show);
module.exports = router;