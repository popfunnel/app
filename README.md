# db-visuals
Visualize your data with SQL

node ~12.18.0  

npm install root directory as well as client folder.  

Start the express server with `node index.js` at the root level and `npm start` inside the client folder.

## Database

### Dependencies + Setup for development

```
brew install postgresql
```

Once postgres is running, log in via 

```
psql
```

and create the development db

```
austin=# create database popfunnel_development;
CREATE DATABASE
```

and create a `root` user

```
austin=# create user root SUPERUSER;
CREATE ROLE
```

### sequelize

Reference page: https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize

to run migrations:

```
sequelize db:migrate
```

to rollback a migration:

```
sequelize db:migrate:undo
```
