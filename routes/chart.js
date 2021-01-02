const express = require('express');
const chartsController = require('../sequelize/controllers').charts;
const router = new express.Router();

router.post('/create', chartsController.create);

router.post('/:dashboard_id', chartsController.update);

router.post('/destroy', chartsController.destroy);

router.get('/:dashboard_id', chartsController.getAllByDashboardId);

module.exports = router;