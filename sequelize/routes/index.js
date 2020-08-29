const express = require('express');
const db_router = new express.Router();
const user = require('./user');

db_router.use('/users', user);

module.exports = db_router;