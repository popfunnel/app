const Database = require('../models').database;

module.exports = {
  // TODO: add display name
  create(req, res) {
    return Database
      .create({
        host: req.body.host,
        port: req.body.port,
        username: req.body.username,
        password: req.body.password,
        database_type: req.body.type,
        name: req.body.name,
        // customer_id: req.body.customer_id,
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
  updateDatabase(req, res) {
    return Database
      .update(
        { 
          host: req.body.host,
          port: req.body.port,
          username: req.body.username,
          password: req.body.password,
          database_type: req.body.type,
          name: req.body.name
        },
        { where: { id: req.body.dbId } }
      )
      .then(database => {
        res.status(200).send(database);
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
          attributes: [
              'id',
              'host',
              'port',
              'username',
              'password',
              'database_type',
              'name'
            ],
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