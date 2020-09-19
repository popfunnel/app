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
            const passwordsMatch = await bcrypt.compare(password, user.passwordHash);

            if (passwordsMatch) {
                return done(null, user);
            } else {
                return done('Incorrect Username or Password');
            }
        } catch (error) {
            done(error);
        }
    }));

    // TODO: create some middleware for 'authentication layer'
    // TODO: allow for external integrations with JWT in header
    function formJWTFromCookies(req) {
        let headerPayload = req.cookies.jwtHeaderPayload;
        let signature = req.cookies.jwtSignature;
        let formedJwt = `${headerPayload}.${signature}`;
        return formedJwt;
    }
    
    passport.use(new JWTStrategy({
        jwtFromRequest: req => formJWTFromCookies(req),
            secretOrKey: process.env.SECRET
        },
        (jwtPayload, done) => {
            if (Date.now() > jwtPayload.expires) {
                return done('jwt expired');
            } else {
                // TODO: set new headerpayload expiry if successful
                // res.cookie('jwtHeaderPayload', jwtHeaderPayload);
                return done(null, jwtPayload);
            }
        }
    ));
    
};


module.exports = initialize;