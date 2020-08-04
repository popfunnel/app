const express = require('express')
const path = require('path')
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config()

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'client/build')));

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

// const JDBC = require('jdbc');
// const jinst = require('jdbc/lib/jinst');
// if (!jinst.isJvmCreated()) {
//     jinst.addOption("-Xrs");
//     jinst.setupClasspath(['./drivers/postgresql-42.2.14.jre7.jar']);
// }


// const config = {
//     // Required
//     url: 'jdbc:postgresql://localhost/db-visuals-pg',
//     // Optional
//     drivername: 'org.postgresql.Driver',
//     minpoolsize: 10,
//     maxpoolsize: 100,
//     user: 'Curtis',
//     password: '',
//     properties: {}
// };

// var psql = new JDBC(config);

// psql.initialize(function(err) {
// if (err) {
//     console.log(err);
// }
// });

// psql.reserve(function(err, connObj) {
//     if (connObj) {
//         console.log("Using connection: " + connObj.uuid);
//         var conn = connObj.conn;
//         conn.createStatement(function(err, statement) {
//             if (err) {
//               console.log(err);
//             } else {
//                 statement.setFetchSize(100, function(err) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     statement.executeQuery("SELECT * FROM actor;",
//                     function(err, resultset) {
//                         if (err) {
//                             console.log(err)
//                         } else {
//                         resultset.toObjArray(function(err, results) {
//                             console.log(results)
//                             console.log(null, resultset);
//                         });
//                         }
//                     });
//                 }
//               });
//             }
//           });

//     }
//     psql.release(connObj, function(err) {
//         if (err) {
//             console.log(err.message)
//         }
//     })

// })