const usersController = require('../controllers').users;

module.exports = (app) => {
  app.get('/users', (req, res) => res.status(200).send({
    message: 'Welcome to the Users List!',
  }));

  app.post('/users/create', usersController.create);
};