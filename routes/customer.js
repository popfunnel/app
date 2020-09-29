const express = require('express');
const customersController = require('../sequelize/controllers').customers;
const router = new express.Router();

router.get('/list', customersController.list);

router.post('/create', customersController.create);

router.get('/info/:customer_id', customersController.getById);

module.exports = router;