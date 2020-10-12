const Customer = require('../models').customer;
const Role = require('../models').role;
const User = require('../models').user;
const UserRole = require('../models').user_role;

const configureNewCustomerRoles = (res, customer, user) => {
  // Create two roles, one for Admins and one for generic Users
  adminRole = Role.create({
    name: "admin",
    customer_id: customer.id,
  });
  everyoneRole = Role.create({
    name: "everyone",
    customer_id: customer.id,
  });

  // Add the user to both roles
  UserRole.create({
    user_id: user.id,
    role_id: adminRole.id,
    customer_id: customer.id,
  });
  UserRole.create({
    user_id: user.id,
    role_id: everyoneRole.id,
    customer_id: customer.id,
  });

  res.status(201).send(customer)
}

const configureNewCustomer = (req, res, customer) => {
  // Find the user who is signing up.
  users = User.findAll({
    where: {
      email: req.body.user.email,
    }
  })

  if(users.length > 0) {
    configureNewCustomerRoles(res, customer, users[0])
  } else {
    // If does not exist, create the user who is signing up
    User.create({
      email: req.body.user.email,
      name: req.body.user.name,
      passwordHash: req.body.user.password,
    })
    .then(user => {
      configureNewCustomerRoles(res, customer, user)
    })
    .catch(error => {
      res.status(400).send(error)
      return
    })
  }
};

module.exports = {
  create(req, res) {
    return Customer
      .create({
        name: req.body.name,
      })
      .then(customer => {
        configureNewCustomer(req, res, customer)
      })
      .catch(error => {
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