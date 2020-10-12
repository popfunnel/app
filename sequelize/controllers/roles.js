const Role = require('../models').role;

module.exports = {
    create(req, res) {
      return Role
        .create({
          customer_id: req.body.customer_id,  
          name: req.body.name,
        })
        .then(role => {
          console.log('role', role)
          res.status(201).send(role)
        })
        .catch(error => {
          console.log('error', error)
          res.status(400).send(error)
        });
    },
    list(req, res) {
      return Role
          .findAll({
            attributes: ['id', 'name'],
            order: [
              ['id', 'ASC']
            ]
          })
          .then(roles => {
              console.log('role', roles)
              res.status(201).send(roles)
          })
          .catch(error => {
              console.log('error', error)
              res.status(400).send(error)
          });
    },
  };
