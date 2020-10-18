const User = require('../models').user;

module.exports = {
  create(req, res) {
    return User
      .create({
          email: req.body.email,
          name: req.body.name,
          passwordHash: req.body.password,
      })
      .then(user => {
        res.status(201).send(user)
      })
      .catch(error => {
        res.status(400).send(error)
      });
  },
  find(userEmail) {
    return User
      .findOne(
        {
          where: {
            email: userEmail
          }
        }
      );
  }
};