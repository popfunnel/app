 /* eslint-disable */ 
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
const schemasColumnInfo = [{
    "table_schema": "public",
    "table_name": "actor",
    "position": 1,
    "column_name": "actor_id",
    "data_type": "integer",
    "max_length": 32,
    "is_nullable": "NO",
    "default_value": "nextval('actor_actor_id_seq'::regclass)"
}, {
    "table_schema": "public",
    "table_name": "actor",
    "position": 2,
    "column_name": "first_name",
    "data_type": "character varying",
    "max_length": 45,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "actor",
    "position": 3,
    "column_name": "last_name",
    "data_type": "character varying",
    "max_length": 45,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "actor",
    "position": 4,
    "column_name": "last_update",
    "data_type": "timestamp without time zone",
    "max_length": null,
    "is_nullable": "NO",
    "default_value": "now()"
}, {
    "table_schema": "public",
    "table_name": "actor_info",
    "position": 1,
    "column_name": "actor_id",
    "data_type": "integer",
    "max_length": 32,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "actor_info",
    "position": 2,
    "column_name": "first_name",
    "data_type": "character varying",
    "max_length": 45,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "actor_info",
    "position": 3,
    "column_name": "last_name",
    "data_type": "character varying",
    "max_length": 45,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "actor_info",
    "position": 4,
    "column_name": "film_info",
    "data_type": "text",
    "max_length": null,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "address",
    "position": 1,
    "column_name": "address_id",
    "data_type": "integer",
    "max_length": 32,
    "is_nullable": "NO",
    "default_value": "nextval('address_address_id_seq'::regclass)"
}, {
    "table_schema": "public",
    "table_name": "address",
    "position": 2,
    "column_name": "address",
    "data_type": "character varying",
    "max_length": 50,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "address",
    "position": 3,
    "column_name": "address2",
    "data_type": "character varying",
    "max_length": 50,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "address",
    "position": 4,
    "column_name": "district",
    "data_type": "character varying",
    "max_length": 20,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "address",
    "position": 5,
    "column_name": "city_id",
    "data_type": "smallint",
    "max_length": 16,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "address",
    "position": 6,
    "column_name": "postal_code",
    "data_type": "character varying",
    "max_length": 10,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "address",
    "position": 7,
    "column_name": "phone",
    "data_type": "character varying",
    "max_length": 20,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "address",
    "position": 8,
    "column_name": "last_update",
    "data_type": "timestamp without time zone",
    "max_length": null,
    "is_nullable": "NO",
    "default_value": "now()"
}, {
    "table_schema": "public",
    "table_name": "category",
    "position": 1,
    "column_name": "category_id",
    "data_type": "integer",
    "max_length": 32,
    "is_nullable": "NO",
    "default_value": "nextval('category_category_id_seq'::regclass)"
}, {
    "table_schema": "public",
    "table_name": "category",
    "position": 2,
    "column_name": "name",
    "data_type": "character varying",
    "max_length": 25,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "category",
    "position": 3,
    "column_name": "last_update",
    "data_type": "timestamp without time zone",
    "max_length": null,
    "is_nullable": "NO",
    "default_value": "now()"
}, {
    "table_schema": "public",
    "table_name": "city",
    "position": 1,
    "column_name": "city_id",
    "data_type": "integer",
    "max_length": 32,
    "is_nullable": "NO",
    "default_value": "nextval('city_city_id_seq'::regclass)"
}, {
    "table_schema": "public",
    "table_name": "city",
    "position": 2,
    "column_name": "city",
    "data_type": "character varying",
    "max_length": 50,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "city",
    "position": 3,
    "column_name": "country_id",
    "data_type": "smallint",
    "max_length": 16,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "city",
    "position": 4,
    "column_name": "last_update",
    "data_type": "timestamp without time zone",
    "max_length": null,
    "is_nullable": "NO",
    "default_value": "now()"
}, {
    "table_schema": "public",
    "table_name": "country",
    "position": 1,
    "column_name": "country_id",
    "data_type": "integer",
    "max_length": 32,
    "is_nullable": "NO",
    "default_value": "nextval('country_country_id_seq'::regclass)"
}, {
    "table_schema": "public",
    "table_name": "country",
    "position": 2,
    "column_name": "country",
    "data_type": "character varying",
    "max_length": 50,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "country",
    "position": 3,
    "column_name": "last_update",
    "data_type": "timestamp without time zone",
    "max_length": null,
    "is_nullable": "NO",
    "default_value": "now()"
}, {
    "table_schema": "public",
    "table_name": "customer",
    "position": 1,
    "column_name": "customer_id",
    "data_type": "integer",
    "max_length": 32,
    "is_nullable": "NO",
    "default_value": "nextval('customer_customer_id_seq'::regclass)"
}, {
    "table_schema": "public",
    "table_name": "customer",
    "position": 2,
    "column_name": "store_id",
    "data_type": "smallint",
    "max_length": 16,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "customer",
    "position": 3,
    "column_name": "first_name",
    "data_type": "character varying",
    "max_length": 45,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "customer",
    "position": 4,
    "column_name": "last_name",
    "data_type": "character varying",
    "max_length": 45,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "customer",
    "position": 5,
    "column_name": "email",
    "data_type": "character varying",
    "max_length": 50,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "customer",
    "position": 6,
    "column_name": "address_id",
    "data_type": "smallint",
    "max_length": 16,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "customer",
    "position": 7,
    "column_name": "activebool",
    "data_type": "boolean",
    "max_length": null,
    "is_nullable": "NO",
    "default_value": "true"
}, {
    "table_schema": "public",
    "table_name": "customer",
    "position": 8,
    "column_name": "create_date",
    "data_type": "date",
    "max_length": null,
    "is_nullable": "NO",
    "default_value": "('now'::text)::date"
}, {
    "table_schema": "public",
    "table_name": "customer",
    "position": 9,
    "column_name": "last_update",
    "data_type": "timestamp without time zone",
    "max_length": null,
    "is_nullable": "YES",
    "default_value": "now()"
}, {
    "table_schema": "public",
    "table_name": "customer",
    "position": 10,
    "column_name": "active",
    "data_type": "integer",
    "max_length": 32,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "customer_list",
    "position": 1,
    "column_name": "id",
    "data_type": "integer",
    "max_length": 32,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "customer_list",
    "position": 2,
    "column_name": "name",
    "data_type": "text",
    "max_length": null,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "customer_list",
    "position": 3,
    "column_name": "address",
    "data_type": "character varying",
    "max_length": 50,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "customer_list",
    "position": 4,
    "column_name": "zip code",
    "data_type": "character varying",
    "max_length": 10,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "customer_list",
    "position": 5,
    "column_name": "phone",
    "data_type": "character varying",
    "max_length": 20,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "customer_list",
    "position": 6,
    "column_name": "city",
    "data_type": "character varying",
    "max_length": 50,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "customer_list",
    "position": 7,
    "column_name": "country",
    "data_type": "character varying",
    "max_length": 50,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "customer_list",
    "position": 8,
    "column_name": "notes",
    "data_type": "text",
    "max_length": null,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "customer_list",
    "position": 9,
    "column_name": "sid",
    "data_type": "smallint",
    "max_length": 16,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "film",
    "position": 1,
    "column_name": "film_id",
    "data_type": "integer",
    "max_length": 32,
    "is_nullable": "NO",
    "default_value": "nextval('film_film_id_seq'::regclass)"
}, {
    "table_schema": "public",
    "table_name": "film",
    "position": 2,
    "column_name": "title",
    "data_type": "character varying",
    "max_length": 255,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "film",
    "position": 3,
    "column_name": "description",
    "data_type": "text",
    "max_length": null,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "film",
    "position": 4,
    "column_name": "release_year",
    "data_type": "integer",
    "max_length": 32,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "film",
    "position": 5,
    "column_name": "language_id",
    "data_type": "smallint",
    "max_length": 16,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "film",
    "position": 6,
    "column_name": "rental_duration",
    "data_type": "smallint",
    "max_length": 16,
    "is_nullable": "NO",
    "default_value": "3"
}, {
    "table_schema": "public",
    "table_name": "film",
    "position": 7,
    "column_name": "rental_rate",
    "data_type": "numeric",
    "max_length": 4,
    "is_nullable": "NO",
    "default_value": "4.99"
}, {
    "table_schema": "public",
    "table_name": "film",
    "position": 8,
    "column_name": "length",
    "data_type": "smallint",
    "max_length": 16,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "film",
    "position": 9,
    "column_name": "replacement_cost",
    "data_type": "numeric",
    "max_length": 5,
    "is_nullable": "NO",
    "default_value": "19.99"
}, {
    "table_schema": "public",
    "table_name": "film",
    "position": 10,
    "column_name": "rating",
    "data_type": "USER-DEFINED",
    "max_length": null,
    "is_nullable": "YES",
    "default_value": "'G'::mpaa_rating"
}, {
    "table_schema": "public",
    "table_name": "film",
    "position": 11,
    "column_name": "last_update",
    "data_type": "timestamp without time zone",
    "max_length": null,
    "is_nullable": "NO",
    "default_value": "now()"
}, {
    "table_schema": "public",
    "table_name": "film",
    "position": 12,
    "column_name": "special_features",
    "data_type": "ARRAY",
    "max_length": null,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "film",
    "position": 13,
    "column_name": "fulltext",
    "data_type": "tsvector",
    "max_length": null,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "film_actor",
    "position": 1,
    "column_name": "actor_id",
    "data_type": "smallint",
    "max_length": 16,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "film_actor",
    "position": 2,
    "column_name": "film_id",
    "data_type": "smallint",
    "max_length": 16,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "film_actor",
    "position": 3,
    "column_name": "last_update",
    "data_type": "timestamp without time zone",
    "max_length": null,
    "is_nullable": "NO",
    "default_value": "now()"
}, {
    "table_schema": "public",
    "table_name": "film_category",
    "position": 1,
    "column_name": "film_id",
    "data_type": "smallint",
    "max_length": 16,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "film_category",
    "position": 2,
    "column_name": "category_id",
    "data_type": "smallint",
    "max_length": 16,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "film_category",
    "position": 3,
    "column_name": "last_update",
    "data_type": "timestamp without time zone",
    "max_length": null,
    "is_nullable": "NO",
    "default_value": "now()"
}, {
    "table_schema": "public",
    "table_name": "film_list",
    "position": 1,
    "column_name": "fid",
    "data_type": "integer",
    "max_length": 32,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "film_list",
    "position": 2,
    "column_name": "title",
    "data_type": "character varying",
    "max_length": 255,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "film_list",
    "position": 3,
    "column_name": "description",
    "data_type": "text",
    "max_length": null,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "film_list",
    "position": 4,
    "column_name": "category",
    "data_type": "character varying",
    "max_length": 25,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "film_list",
    "position": 5,
    "column_name": "price",
    "data_type": "numeric",
    "max_length": 4,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "film_list",
    "position": 6,
    "column_name": "length",
    "data_type": "smallint",
    "max_length": 16,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "film_list",
    "position": 7,
    "column_name": "rating",
    "data_type": "USER-DEFINED",
    "max_length": null,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "film_list",
    "position": 8,
    "column_name": "actors",
    "data_type": "text",
    "max_length": null,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "inventory",
    "position": 1,
    "column_name": "inventory_id",
    "data_type": "integer",
    "max_length": 32,
    "is_nullable": "NO",
    "default_value": "nextval('inventory_inventory_id_seq'::regclass)"
}, {
    "table_schema": "public",
    "table_name": "inventory",
    "position": 2,
    "column_name": "film_id",
    "data_type": "smallint",
    "max_length": 16,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "inventory",
    "position": 3,
    "column_name": "store_id",
    "data_type": "smallint",
    "max_length": 16,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "inventory",
    "position": 4,
    "column_name": "last_update",
    "data_type": "timestamp without time zone",
    "max_length": null,
    "is_nullable": "NO",
    "default_value": "now()"
}, {
    "table_schema": "public",
    "table_name": "language",
    "position": 1,
    "column_name": "language_id",
    "data_type": "integer",
    "max_length": 32,
    "is_nullable": "NO",
    "default_value": "nextval('language_language_id_seq'::regclass)"
}, {
    "table_schema": "public",
    "table_name": "language",
    "position": 2,
    "column_name": "name",
    "data_type": "character",
    "max_length": 20,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "language",
    "position": 3,
    "column_name": "last_update",
    "data_type": "timestamp without time zone",
    "max_length": null,
    "is_nullable": "NO",
    "default_value": "now()"
}, {
    "table_schema": "public",
    "table_name": "nicer_but_slower_film_list",
    "position": 1,
    "column_name": "fid",
    "data_type": "integer",
    "max_length": 32,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "nicer_but_slower_film_list",
    "position": 2,
    "column_name": "title",
    "data_type": "character varying",
    "max_length": 255,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "nicer_but_slower_film_list",
    "position": 3,
    "column_name": "description",
    "data_type": "text",
    "max_length": null,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "nicer_but_slower_film_list",
    "position": 4,
    "column_name": "category",
    "data_type": "character varying",
    "max_length": 25,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "nicer_but_slower_film_list",
    "position": 5,
    "column_name": "price",
    "data_type": "numeric",
    "max_length": 4,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "nicer_but_slower_film_list",
    "position": 6,
    "column_name": "length",
    "data_type": "smallint",
    "max_length": 16,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "nicer_but_slower_film_list",
    "position": 7,
    "column_name": "rating",
    "data_type": "USER-DEFINED",
    "max_length": null,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "nicer_but_slower_film_list",
    "position": 8,
    "column_name": "actors",
    "data_type": "text",
    "max_length": null,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "payment",
    "position": 1,
    "column_name": "payment_id",
    "data_type": "integer",
    "max_length": 32,
    "is_nullable": "NO",
    "default_value": "nextval('payment_payment_id_seq'::regclass)"
}, {
    "table_schema": "public",
    "table_name": "payment",
    "position": 2,
    "column_name": "customer_id",
    "data_type": "smallint",
    "max_length": 16,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "payment",
    "position": 3,
    "column_name": "staff_id",
    "data_type": "smallint",
    "max_length": 16,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "payment",
    "position": 4,
    "column_name": "rental_id",
    "data_type": "integer",
    "max_length": 32,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "payment",
    "position": 5,
    "column_name": "amount",
    "data_type": "numeric",
    "max_length": 5,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "payment",
    "position": 6,
    "column_name": "payment_date",
    "data_type": "timestamp without time zone",
    "max_length": null,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "rental",
    "position": 1,
    "column_name": "rental_id",
    "data_type": "integer",
    "max_length": 32,
    "is_nullable": "NO",
    "default_value": "nextval('rental_rental_id_seq'::regclass)"
}, {
    "table_schema": "public",
    "table_name": "rental",
    "position": 2,
    "column_name": "rental_date",
    "data_type": "timestamp without time zone",
    "max_length": null,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "rental",
    "position": 3,
    "column_name": "inventory_id",
    "data_type": "integer",
    "max_length": 32,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "rental",
    "position": 4,
    "column_name": "customer_id",
    "data_type": "smallint",
    "max_length": 16,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "rental",
    "position": 5,
    "column_name": "return_date",
    "data_type": "timestamp without time zone",
    "max_length": null,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "rental",
    "position": 6,
    "column_name": "staff_id",
    "data_type": "smallint",
    "max_length": 16,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "rental",
    "position": 7,
    "column_name": "last_update",
    "data_type": "timestamp without time zone",
    "max_length": null,
    "is_nullable": "NO",
    "default_value": "now()"
}, {
    "table_schema": "public",
    "table_name": "sales_by_film_category",
    "position": 1,
    "column_name": "category",
    "data_type": "character varying",
    "max_length": 25,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "sales_by_film_category",
    "position": 2,
    "column_name": "total_sales",
    "data_type": "numeric",
    "max_length": null,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "sales_by_store",
    "position": 1,
    "column_name": "store",
    "data_type": "text",
    "max_length": null,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "sales_by_store",
    "position": 2,
    "column_name": "manager",
    "data_type": "text",
    "max_length": null,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "sales_by_store",
    "position": 3,
    "column_name": "total_sales",
    "data_type": "numeric",
    "max_length": null,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "staff",
    "position": 1,
    "column_name": "staff_id",
    "data_type": "integer",
    "max_length": 32,
    "is_nullable": "NO",
    "default_value": "nextval('staff_staff_id_seq'::regclass)"
}, {
    "table_schema": "public",
    "table_name": "staff",
    "position": 2,
    "column_name": "first_name",
    "data_type": "character varying",
    "max_length": 45,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "staff",
    "position": 3,
    "column_name": "last_name",
    "data_type": "character varying",
    "max_length": 45,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "staff",
    "position": 4,
    "column_name": "address_id",
    "data_type": "smallint",
    "max_length": 16,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "staff",
    "position": 5,
    "column_name": "email",
    "data_type": "character varying",
    "max_length": 50,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "staff",
    "position": 6,
    "column_name": "store_id",
    "data_type": "smallint",
    "max_length": 16,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "staff",
    "position": 7,
    "column_name": "active",
    "data_type": "boolean",
    "max_length": null,
    "is_nullable": "NO",
    "default_value": "true"
}, {
    "table_schema": "public",
    "table_name": "staff",
    "position": 8,
    "column_name": "username",
    "data_type": "character varying",
    "max_length": 16,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "staff",
    "position": 9,
    "column_name": "password",
    "data_type": "character varying",
    "max_length": 40,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "staff",
    "position": 10,
    "column_name": "last_update",
    "data_type": "timestamp without time zone",
    "max_length": null,
    "is_nullable": "NO",
    "default_value": "now()"
}, {
    "table_schema": "public",
    "table_name": "staff",
    "position": 11,
    "column_name": "picture",
    "data_type": "bytea",
    "max_length": null,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "staff_list",
    "position": 1,
    "column_name": "id",
    "data_type": "integer",
    "max_length": 32,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "staff_list",
    "position": 2,
    "column_name": "name",
    "data_type": "text",
    "max_length": null,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "staff_list",
    "position": 3,
    "column_name": "address",
    "data_type": "character varying",
    "max_length": 50,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "staff_list",
    "position": 4,
    "column_name": "zip code",
    "data_type": "character varying",
    "max_length": 10,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "staff_list",
    "position": 5,
    "column_name": "phone",
    "data_type": "character varying",
    "max_length": 20,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "staff_list",
    "position": 6,
    "column_name": "city",
    "data_type": "character varying",
    "max_length": 50,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "staff_list",
    "position": 7,
    "column_name": "country",
    "data_type": "character varying",
    "max_length": 50,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "staff_list",
    "position": 8,
    "column_name": "sid",
    "data_type": "smallint",
    "max_length": 16,
    "is_nullable": "YES",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "store",
    "position": 1,
    "column_name": "store_id",
    "data_type": "integer",
    "max_length": 32,
    "is_nullable": "NO",
    "default_value": "nextval('store_store_id_seq'::regclass)"
}, {
    "table_schema": "public",
    "table_name": "store",
    "position": 2,
    "column_name": "manager_staff_id",
    "data_type": "smallint",
    "max_length": 16,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "store",
    "position": 3,
    "column_name": "address_id",
    "data_type": "smallint",
    "max_length": 16,
    "is_nullable": "NO",
    "default_value": null
}, {
    "table_schema": "public",
    "table_name": "store",
    "position": 4,
    "column_name": "last_update",
    "data_type": "timestamp without time zone",
    "max_length": null,
    "is_nullable": "NO",
    "default_value": "now()"
}]
const schemaNames = getSchemaNames(schemasColumnInfo)
const tableNameBySchemaName = getTableNameBySchemaName(schemasColumnInfo)
const columnNameByTableName = getColumnNamesByTableName(schemasColumnInfo)

const StyledTreeItem = withStyles((theme) => ({
    label: {
        fontSize: 12
    }
}))(TreeItem);

export const SchemaTreeView = () => {
    return (
        <div style={{marginTop: '10px'}}>
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                multiSelect
            >
                {schemaNames.map(schemaName => (
                    <StyledTreeItem key={schemaName} nodeId={schemaName} label={schemaName}>
                        {tableNameBySchemaName[schemaName].map(tableName => (
                            <StyledTreeItem key={tableName} nodeId={tableName} label={tableName}>
                                {columnNameByTableName[tableName].map(columnName => (
                                    <StyledTreeItem key={columnName} nodeId={columnName} label={columnName}/>
                                ))}
                            </StyledTreeItem>
                        ))}
                    </StyledTreeItem>
                ))}
                {/* <StyledTreeItem nodeId="1" label="Table Name1">
                    <StyledTreeItem nodeId="column" label="Column"/>
                    <StyledTreeItem nodeId="3" label="Column"/>
                    <StyledTreeItem nodeId="4" label="Column"/>
                </StyledTreeItem>
                <StyledTreeItem nodeId="5" label="Table Name2">
                    <StyledTreeItem nodeId="6" label="Actor">
                        <StyledTreeItem nodeId="7" label="Columns">
                            <StyledTreeItem nodeId="8" label="Column"/>
                            <StyledTreeItem nodeId="9" label="Column"/>
                        </StyledTreeItem>
                    </StyledTreeItem>
                </StyledTreeItem> */}
            </TreeView>
        </div>
    );
};

function getSchemaNames(schemasColumnInfo) {
    return [...new Set(schemasColumnInfo.map(column => column.table_schema))]
}

function getTableNameBySchemaName(schemasColumnInfo) {
    const tableNameBySchemaName = {}
    schemasColumnInfo.forEach(column => {
        if(tableNameBySchemaName[column.table_schema]) {
            if (tableNameBySchemaName[column.table_schema].indexOf(column.table_name) === -1) {
                tableNameBySchemaName[column.table_schema].push(column.table_name)
            }
        } else {
            tableNameBySchemaName[column.table_schema] = [column.table_name]
        }
    })
    return tableNameBySchemaName
}

function getColumnNamesByTableName(schemasColumnInfo) {
    const columnNamesByTable = {}
    schemasColumnInfo.forEach(column => {
        if(columnNamesByTable[column.table_name]) {
            columnNamesByTable[column.table_name].push(column.column_name)
        } else {
            columnNamesByTable[column.table_name] = [column.column_name]
        }
    })
    return columnNamesByTable
}