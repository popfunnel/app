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
};