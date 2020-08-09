const User = require('../models').user;

module.exports = {
  create(req, res) {
    return User
      .create({
        // emailAddress: req.body.emailAddress,
        email: 'blah'
      })
      .then(user => {
        console.log('user', user)
        res.status(201).send(user)
      })
      .catch(error => {
        console.log('error', error)
        res.status(400).send(error)
      });
  },
};