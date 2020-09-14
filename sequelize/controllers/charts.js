const Chart = require('../models').chart;

module.exports = {
  create(req, res) {
    console.log(JSON.stringify(req.body.rawResults));

    return Chart
      .create({
        name: req.body.name,
        type: req.body.type, 
        config: req.body.config,
        raw_query: req.body.rawQuery,
        raw_results: req.body.rawResults,
        dashboard_id: req.body.dashboardId
      })
      .then(chart => {
        console.log('chart', chart)
        res.status(201).send(chart)
      })
      .catch(error => {
        console.log('error', error)
        res.status(400).send(error)
      });
  },
  getAllByDashboardId(req, res) {
    return Chart
      .findAll({
        where: {
          dashboard_id: req.params["dashboard_id"]
        }
      })
      .then(charts => {
          console.log('dashboard_id', req.params["dashboard_id"])
          console.log('charts', charts)
          res.status(201).send(charts)
      })
      .catch(error => {
          console.log('error', error)
          res.status(400).send(error)
      });
  }
};