const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const categoriesRouter = require('./routes/categories');
const blogsRouter = require('./routes/blogs');
const authenticationRouter = require('./routes/autentication');

const app = express();
const url = '/api/v1';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(url, authenticationRouter);
app.use(url, categoriesRouter);
app.use(url, blogsRouter);

module.exports = app;
