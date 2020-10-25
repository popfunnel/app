const express = require('express');
const databasesController = require('../sequelize/controllers').databases;
const router = new express.Router();

router.get('/list', databasesController.list);

router.post('/create', databasesController.create);

router.post('/update', databasesController.updateDatabase);

router.get('/info/:database_id', databasesController.getById);

module.exports = router;