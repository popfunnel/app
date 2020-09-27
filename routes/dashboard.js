const express = require('express');
const dashboardsController = require('../sequelize/controllers').dashboards;
const router = new express.Router();

router.get('/list', dashboardsController.list);

router.post('/create', dashboardsController.create);

router.post('/update-layout', dashboardsController.updateLayout);

router.get('/info/:dashboard_id', dashboardsController.getById);

module.exports = router;