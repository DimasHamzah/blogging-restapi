const express = require('express');
const router = express.Router();
const { body,validationResult } = require('express-validator');
const { login, register } = require('../app/controllers/AuthenticationController');

router.post('/login', [
    body('email').notEmpty().withMessage('Email is required'),
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters'),
],login);

router.post('/register', [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password must be at least 8 characters'),
],  register);

module.exports = router;