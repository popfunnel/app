const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByUsername, getUserById) {

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, async (username, password, done) => {
        // TODO: use database here
        try {
            const user = getUserByUsername(username);
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
            if (Date.now() > jwtPayload.expires) {
                return done('jwt expired');
            } else {
                return done(null, jwtPayload);
            }
        }
    ))
};


module.exports = initialize;