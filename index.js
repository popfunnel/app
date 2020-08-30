const express = require('express')
const path = require('path')
const dotenv = require('dotenv');
dotenv.config()

const jinst = require('jdbc/lib/jinst');
if (!jinst.isJvmCreated()) {
    jinst.addOption("-Xrs");
    jinst.setupClasspath(['./drivers/postgresql-42.2.14.jre7.jar']);
}

const bodyParser = require('body-parser');
const queries = require('./routes/queries');
const user = require('./routes/user');
const dashboard = require('./routes/dashboard');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//static react build 
app.use(express.static(path.join(__dirname, 'client/build')));


// internal routes 
app.post('/login', (req, res) => {
   res.send('I see you are trying to login.'); 
});

app.post('/register', (req, res) => {
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