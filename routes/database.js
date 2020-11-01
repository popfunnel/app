const express = require('express');
const databasesController = require('../sequelize/controllers').databases;
const router = new express.Router();

router.get('/list', databasesController.list);

router.get('/list-options', databasesController.listOptions);

router.post('/create', databasesController.create);

router.post('/update', databasesController.updateDatabase);

router.get('/info/:database_id', databasesController.getById);

module.exports = router;