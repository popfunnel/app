const Database = require('../models').database;

module.exports = {
  create(req, res) {
    return Database
      .create({
        name: req.body.name,
        // add user meta
      })
      .then(database => {
        console.log('database', database)
        res.status(201).send(database)
      })
      .catch(error => {
        console.log('error', error)
        res.status(400).send(error)
      });
  },
  getById(req, res) {
    return Database
      .findByPk(req.params["database_id"])
      .then(database => {
          console.log('did', req.params["database_id"])
          console.log('database', database)
          res.status(201).send(database)
      })
      .catch(error => {
          console.log('error', error)
          res.status(400).send(error)
      });
  },
  list(req, res) {
    return Database
        .findAll({
          attributes: ['id', 'name'],
          order: [
            ['id', 'ASC']
          ]
        })
        .then(databases => {
            console.log('database', databases)
            res.status(201).send(databases)
        })
        .catch(error => {
            console.log('error', error)
            res.status(400).send(error)
        });
  },
};