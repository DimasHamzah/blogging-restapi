const express = require('express');
const router = express.Router();
const { index, show, store, update, destroy } = require('../app/controllers/BlogsController');
const { auth } = require('../app/middleware/auth');
const { uploadMiddleware } = require('../app/middleware/multer');
const { validationBlog } = require('../app/validation/BlogValidation');

router.get('/blog', auth ,index);
router.get('/blog/:slug',auth , show);
router.post('/blog', auth, uploadMiddleware.single('image') ,validationBlog, store);
router.put('/blog/:id', auth, uploadMiddleware.single('image'), validationBlog, update);
router.delete('/blog/:id',auth ,destroy);
module.exports = router;