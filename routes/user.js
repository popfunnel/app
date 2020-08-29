const express = require('express');
const usersController = require('../sequelize/controllers').users;
const router = new express.Router();

router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the Users List!',
}));

router.post('/create', usersController.create);

module.exports = router;