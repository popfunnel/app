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
const bcrypt = require('bcrypt');

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
    console.log('here is req.body', req.body)
    res.send(JSON.stringify('I see you are trying to login.')); 
});

// TODO: our database will take the place of users
const users = [];
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // TODO: store this password in db
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login');
    } catch {
        res.redirect('/register');
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