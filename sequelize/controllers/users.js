const User = require('../models').user;

module.exports = {
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