const User = require('../models').User;

module.exports = {
    create(req, res) {
      return Todo
        .create({
          emailAddress: req.body.emailAddress,
        })
        .then(todo => res.status(201).send(todo))
        .catch(error => res.status(400).send(error));
    },
  };