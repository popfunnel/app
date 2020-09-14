const express = require('express');
const dashboardsController = require('../sequelize/controllers').dashboards;
const router = new express.Router();

router.get('/list', dashboardsController.list);

router.post('/create', dashboardsController.create);

router.get('/:dashboard_id', dashboardsController.getById);

module.exports = router;