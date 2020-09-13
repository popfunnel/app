const Chart = require('../models').chart;

module.exports = {
  create(req, res) {
    return Chart
      .create({
        name: req.body.name,
        // dashboard_id:,
        // config:,
        // configured_results:,
        // raw_results:,
        // add user meta
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
  getAllByDashboard(req, res) {
    return Chart
      .findAll({
        where: {
          dashboard_id: req.params["dashboard_id"]
        }
      })
      .then(charts => {
          // console.log('did', req.params["dashboard_id"])
          console.log('charts', charts)
          res.status(201).send(charts)
      })
      .catch(error => {
          console.log('error', error)
          res.status(400).send(error)
      });
  }
};