-- This is an internal representation, but we should use openID for the auth components
create table "user"(
    user_id serial PRIMARY KEY,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp,
    deleted_at timestamp,
    name text not null
);

-- Customer is an umbrella over all data for this customer
-- It's an abstract concept, it doesn't materialize physically
create table customer(
    customer_id serial PRIMARY KEY,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp,
    deleted_at timestamp,
    name text not null
);

-- A space is a collection of projects
create table "space"(
    space_id serial PRIMARY KEY,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp,
    deleted_at timestamp,
    customer_id integer,
    name text not null  
);

-- A project is like a slide deck
create table project(
    project_id serial PRIMARY KEY,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp,
    deleted_at timestamp,
    customer_id integer,
    space_id integer,
    created_by integer,
    owned_by integer,
    updated_by integer,
    name text not null  
);

-- a dashboard is like a slide on a deck
create table dashboard(
    dashboard_id serial PRIMARY KEY,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp,
    deleted_at timestamp,
    customer_id integer,
    space_id integer,
    project_id integer,
    created_by integer,
    owned_by integer,
    updated_by integer,
    name text not null
);

-- sql used in query, query is at project level
create table query(
    query_id serial PRIMARY KEY,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp,
    deleted_at timestamp,
    customer_id integer,
    project_id integer,
    created_by integer,
    owned_by integer,
    updated_by integer,
    name text not null,
    sql text
);

-- a chart is a query + a plotly representation
-- it exists on a dashboard
create table chart(
    chart_id serial PRIMARY KEY,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp,
    deleted_at timestamp,
    customer_id integer,
    space_id integer,
    project_id integer,
    dashboard_id integer,
    query_id integer,
    created_by integer,
    owned_by integer,
    updated_by integer,
    name text not null
);
