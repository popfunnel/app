const express = require('express')
const path = require('path')
const dotenv = require('dotenv');
dotenv.config()

const jinst = require('jdbc/lib/jinst');
if (!jinst.isJvmCreated()) {
    jinst.addOption("-Xrs");
    jinst.setupClasspath(['./drivers/postgresql-42.2.14.jre7.jar']);
}

const queries = require('./routes/queries');
const user = require('./routes/user');
const dashboard = require('./routes/dashboard');

const app = express();
const passport = require('passport');

const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = [];
const initializePassport = require('./passport-config');
initializePassport(
    passport,
    username => users.find(user => user.username === username),
    id => users.find(user => user.id === id),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//static react build 
app.use(express.static(path.join(__dirname, 'client/build')));


// internal routes 
app.post('/login', (req, res) => {
    passport.authenticate(
        'local',
        {session: false},
        (error, user) => {
            if (error || !user) {
                res.status(400).json({error});
            }

            const minutes = 30;
            const expire_time = new Date().getTime() + (minutes * 60 * 1000);

            const payload = {
                username: user.username,
                expires: expire_time
            };

            req.login(payload, {session: false}, (error) => {
                if (error) {
                    res.status(400).send({error});
                }
                const token = jwt.sign(JSON.stringify(payload), process.env.SECRET);

                res.cookie('token', token, {httpOnly: true});

                res.status(200).send({ username });
            })
        }

    ) (req, res);
    // res.send(JSON.stringify('I see you are trying to login.')); 
});

// TODO: our database will take the place of users

app.post('/register', async (req, res) => {

    const {username, password, email} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({
            id: Date.now().toString(),
            username: username,
            email: email,
            password: hashedPassword
        })
        res.redirect('/login');
        // res.status(200).send({username})
    } catch (error) {
        res.status(400).send({
            error: 'Error registering user.'
        })
        // res.redirect('/register');
    }
    res.send('I see you are trying to register')
});

app.use('/queries', queries);
app.use('/user', user);
app.use('/dashboard', dashboard);

// Default index.html for no matching routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`App listening on port ${port}.`)