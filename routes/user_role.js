const express = require('express');
const userRolesController = require('../sequelize/controllers').user_roles;
const router = new express.Router();

router.get('/list', userRolesController.list);

router.post('/create', userRolesController.create);

module.exports = router;