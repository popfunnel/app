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
const cookieParser = require('cookie-parser');


const initializePassport = require('./passport-config');
initializePassport(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// static react build 
app.use(express.static(path.join(__dirname, 'client/build')));

// backend server routes
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