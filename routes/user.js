const express = require('express');
const usersController = require('../sequelize/controllers').users;
const router = new express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the Users List!',
}));

router.post('/create', usersController.create);
router.post('/register', usersController.create);

router.post('/login', (req, res) => {
  passport.authenticate(
    'local',
    {session: false},
    (error, user) => {
      
      if (error || !user) {
        return res.status(400).json({error});
      }

      const minutes = 30;
      const expire_time = new Date().getTime() + (minutes * 60 * 1000);
      const payload = {
        username: user.email,
        expires: expire_time
      };

      req.login(payload, {session: false}, (error) => {
        if (error) {
            res.status(400).send({error});
        }

        const token = jwt.sign(JSON.stringify(payload), process.env.SECRET);
        let splitToken = token.split('.');
        let jwtHeaderPayload = `${splitToken[0]}.${splitToken[1]}`;
        let jwtSignature = splitToken[2];

        res.cookie('jwtHeaderPayload', jwtHeaderPayload);
        res.cookie('jwtSignature', jwtSignature, {httpOnly: true});
        return res.status(200).send({ payload });
      });
    }
  ) (req, res);
});

router.get('/protected',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const { user } = req;
    res.status(200).send({user});
});

module.exports = router;