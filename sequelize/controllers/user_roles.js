const UserRole = require('../models').user_role;

module.exports = {
    create(req, res) {
      return UserRole
        .create({
          customer_id: req.body.customer_id,  
          role_id: req.body.role_id,  
          user_id: req.body.user_id,  
        })
        .then(user_role => {
          console.log('role', user_role)
          res.status(201).send(user_role)
        })
        .catch(error => {
          console.log('error', error)
          res.status(400).send(error)
        });
    },
    list(req, res) {
      return UserRole
          .findAll({
            attributes: ['id', 'name'],
            order: [
              ['id', 'ASC']
            ]
          })
          .then(user_roles => {
              console.log('role', user_roles)
              res.status(201).send(user_roles)
          })
          .catch(error => {
              console.log('error', error)
              res.status(400).send(error)
          });
    },
  };