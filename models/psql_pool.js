const JDBC = require('jdbc');
const dotenv = require('dotenv');
dotenv.config();

const config = {
    // Required
    url: 'jdbc:postgresql://localhost/popfunnel_development',
    // Optional
    drivername: 'org.postgresql.Driver',
    minpoolsize: 10,
    maxpoolsize: 100,
    user: 'root',
    password: '',
    properties: {}
};

const psql_pool = new JDBC(config);

psql_pool.initialize(function(err) {
    if (err) {
        console.log(err);
    }
});

module.exports = psql_pool;
