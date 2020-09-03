const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const bcrypt = require('bcrypt');
const usersController = require('./sequelize/controllers').users;

function initialize(passport) {

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, async (username, password, done) => {
        try {
            const user = await usersController.find(username);
            const passwordsMatch = bcrypt.compare(password, user.password);

            if (passwordsMatch) {
                return done(null, user);
            } else {
                return done('Incorrect Username or Password');
            }
        } catch (error) {
            done(error);
        }
    }));

    passport.use(new JWTStrategy({
            jwtFromRequest: req => req.cookies.jwt,
            secretOrKey: process.env.SECRET
        },
        (jwtPayload, done) => {
            console.log('jwtPayload', )
            if (Date.now() > jwtPayload.expires) {
                return done('jwt expired');
            } else {
                return done(null, jwtPayload);
            }
        }
    ));
    
};


module.exports = initialize;