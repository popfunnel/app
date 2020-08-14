const User = require('../models').user;

module.exports = {
    post(req, res) {
        console.log("Asking to post login")
        User.findOne({ where: { email: req.email } }).then(function (user) {
            if (!user) {
                res.redirect('/login')
            } else if (!user.validPassword(password)) {
                res.redirect('/login');
            } else {
                res.redirect('/')
            }
        })
    },
};
