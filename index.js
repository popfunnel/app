const express = require('express')
const path = require('path')

const dotenv = require('dotenv');
dotenv.config()

const bodyParser = require('body-parser');
const jinst = require('jdbc/lib/jinst');

if (!jinst.isJvmCreated()) {
    jinst.addOption("-Xrs");
    jinst.setupClasspath(['./drivers/postgresql-42.2.14.jre7.jar']);
}

const queries = require('./routes/queries');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/queries', queries);
app.use('/', queries);

app.get('/templateroute', (req, res) => {
    res.send('this route is set up correctly');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

const port = process.env.PORT || 5000;
app.listen(port)


