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

app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/queries', queries);

// internal db routes
app.use('/user', user);
app.use('/dashboard', dashboard);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`App listening on port ${port}.`)

// TODO: create express folder 
// https://github.com/sequelize/express-example/blob/master/express-main-example/index.js