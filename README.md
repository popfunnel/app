<p align="center">
  <img src="https://github.com/popfunnel/db-visuals/blob/master/docs/images/popfunnel_logo.png" alt="popfunnel logo" width="150"/>
</p>
<h1 align="center">app</h1>

This is a passion project from the studio of Curtis Lin and Austin Gibbons. The main goal of this platform is to turn SQL queries into beautiful charts, and present those dashboards in beautiful dashboards. You can visit the platform [here](https://app.popfunnel.com/).

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


create a password for the user 
```
\password root
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

Keep in mind that when connecting to prod, the `postgres` database name should be used (maintenance db). 

https://www.postgresql.org/docs/current/manage-ag-templatedbs.html
>The postgres database is also created when a database cluster is initialized. This >database is meant as a default database for users and applications to connect to. It >is simply a copy of template1 and can be dropped and recreated if necessary.

### Lightsail notes
After coming back to this after a hiatus, it was incredibly painful to get this up and running again. Some callouts:
1. the example database is called popfunnel_demo and is the same database server that holds our internal app infrastructure (roles, users, etc.). The psql_pool.js file needs to be updated in the live server to reflect this.
2. The app infrastructure database is called popfunnel_production, but there is an identical database called `postgres` (default maintenance database)
3. `dbtartan-production` in prod is unused.

## TODO
1. Figure out setup for local database (currently using prod credentials)
2. Figure out setup for local demo database (currently using prod demo credentials)
3. Figure out how to setup prod databases (and recreate) in an easier fashion
4. Renew SSL certificate in prod
5. Figure out wildcard localhost setup



```
### recharts

Reference: https://recharts.org/en-US/

https://medium.com/@Josylad/how-to-install-postgresql-on-ubuntu-linux-mac-5e08b09b3fb9

