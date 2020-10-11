const express = require('express');
const chartsController = require('../sequelize/controllers').charts;
const router = new express.Router();

// router.get('/update', chartsController.update);

router.post('/create', chartsController.create);

router.post('/destroy', chartsController.destroy);

router.get('/:dashboard_id', chartsController.getAllByDashboardId);

module.exports = router;