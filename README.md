<p align="center">
  <img src="https://github.com/popfunnel/db-visuals/blob/master/client/public/android-chrome-192x192.png" alt="popfunnel logo"/>
</p>

# db-visuals
Visualize your data with SQL

## Local Development

node ~12.18.0  

`npm install` root directory as well as client folder.  

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

to run seeds:
```
sequelize db:seed:all
```

to undo a seed:
```
npx sequelize-cli db:seed:undo
```

to create a model:
```
sequelize model:generate --name dashboard --underscored --attributes created_by:integer,updated_by:integer,owned_by:integer,name:string,customer_id:integer,charts:array:integer
```
### recharts

Reference: https://recharts.org/en-US/
