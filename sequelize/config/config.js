const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config()

module.exports = {
  development: {
    username: 'root',
    password: 'popfunnel',
    database: 'popfunnel_development',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    logging: console.log
  },
  test: {
    username: 'root',
    password: null,
    database: 'popfunnel_test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    dialect: 'postgres',
    // dialectOptions: {
    //   bigNumberStrings: true,
    //   ssl: {
    //     ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
    //   }
    // }
  }
};