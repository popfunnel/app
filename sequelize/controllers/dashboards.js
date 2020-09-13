const Dashboard = require('../models').dashboard;

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
        .findAll({attributes: ['id', 'name']})
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