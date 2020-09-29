const Customer = require('../models').customer;

module.exports = {
  create(req, res) {
    return Customer
      .create({
        name: req.body.name,
      })
      .then(customer => {
        console.log('customer', customer)
        res.status(201).send(customer)
      })
      .catch(error => {
        console.log('error', error)
        res.status(400).send(error)
      });
  },
  getById(req, res) {
    return Customer
      .findByPk(req.params["customer_id"])
      .then(customer => {
          console.log('did', req.params["customer_id"])
          console.log('customer', customer)
          res.status(201).send(customer)
      })
      .catch(error => {
          console.log('error', error)
          res.status(400).send(error)
      });
  },
  list(req, res) {
    return Customer
        .findAll({
          attributes: [
              'id',
              'name'
            ],
          order: [
            ['id', 'ASC']
          ]
        })
        .then(customers => {
            console.log('customer', customers)
            res.status(201).send(customers)
        })
        .catch(error => {
            console.log('error', error)
            res.status(400).send(error)
        });
  },
};