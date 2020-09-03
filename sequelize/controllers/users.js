const User = require('../models').user;

module.exports = {
  // create(req, res) {
  //   return User
  //     .create({
  //       emailAddress: req.body.emailAddress,
  //       name: req.body.name,
  //       password_hash: req.body.password_hash
  //     })
  //     .then(user => {
  //       console.log('user', user)
  //       res.status(201).send(user)
  //     })
  //     .catch(error => {
  //       console.log('error', error)
  //       res.status(400).send(error)
  //     });
  // },
  create(userInfo) {
    return User
      .create({
        email: userInfo.email,
        name: userInfo.name,
        passwordHash: userInfo.passwordHash
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