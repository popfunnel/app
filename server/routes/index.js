const express = require('express');
const loginController = require('../controllers').login;
const usersController = require('../controllers').users;
const router = new express.Router();

router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the Users List!',
}));

router.post('/create', usersController.create);

router.post('/login', loginController.post)

module.exports = router;