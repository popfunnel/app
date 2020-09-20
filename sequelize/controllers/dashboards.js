const Dashboard = require('../models').dashboard;

// TODO: update server codes
module.exports = {
  create(req, res) {
    return Dashboard
      .create({
        name: req.body.name,
        // add user meta
      })
      .then(dashboard => {
        console.log('dashboard', dashboard)
        res.status(201).send(dashboard)
      })
      .catch(error => {
        console.log('error', error)
        res.status(400).send(error)
      });
  },
  updateLayout(req, res) {
    return Dashboard
      .findByPk(req.body.dashboard_id)
      .then(dashboard => {
        dashboard.chart_layout = req.body.chartLayout;
        return dashboard.save()
      })
      .then(dashboard => {
        res.status(200).send(dashboard);
      })
      .catch(error => {
        console.log('error', error)
        res.status(400).send(error)
      });
  },
  getById(req, res) {
    return Dashboard
      .findByPk(req.params["dashboard_id"])
      .then(dashboard => {
          console.log('did', req.params["dashboard_id"])
          console.log('dashboard', dashboard)
          res.status(201).send(dashboard)
      })
      .catch(error => {
          console.log('error', error)
          res.status(400).send(error)
      });
  },
  list(req, res) {
    return Dashboard
        .findAll({
          attributes: ['id', 'name'],
          order: [
            ['id', 'ASC']
          ]
        })
        .then(dashboards => {
            console.log('dashboard', dashboards)
            res.status(201).send(dashboards)
        })
        .catch(error => {
            console.log('error', error)
            res.status(400).send(error)
        });
  },
};