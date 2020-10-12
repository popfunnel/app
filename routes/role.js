const express = require('express');
const rolesController = require('../sequelize/controllers').roles;
const router = new express.Router();

router.get('/list', rolesController.list);

router.post('/create', rolesController.create);

module.exports = router;