const express = require('express');
const psql_pool = require('../models/psql_pool');

const router = new express.Router();

router.get('/schemas', function(req, res, next) {
  const query = `select table_schema,
  table_name,
  ordinal_position as position,
  column_name,
  data_type,
  case when character_maximum_length is not null
        then character_maximum_length
        else numeric_precision end as max_length,
  is_nullable,
  column_default as default_value
from information_schema.columns
where table_schema not in ('information_schema', 'pg_catalog')
order by table_schema, 
    table_name,
    ordinal_position;`;
  psql_pool.reserve(function(err, connObj) {
  if (connObj) {
    var conn = connObj.conn;
    conn.createStatement(
      function(err, statement) {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
            statement.setFetchSize(100, 
            function(err) {
              if (err) {
                console.log(err);
                res.send(err);
              } else {
                statement.executeQuery(query,
                function(err, resultset) {
                  if (err) {
                    console.log(err);
                    res.send(err);
                  } else {
                    resultset.toObjArray(
                      function(err, results) {
                        res.send(JSON.stringify(results));
                        console.log(results)
                      }
                    );
                  }
                });
              }
            });
          }
        });
      psql_pool.release(connObj, function(err) {
          if (err) {
              console.log(err.message)
          }
      });
    };
  });
});

router.post('/executeQuery', function(req, res, next) {
    console.log('--------REQUEST DATA--------');
    console.log(req.body);
    const query = req.body.query;
    psql_pool.reserve(function(err, connObj) {
        if (connObj) {
            var conn = connObj.conn;
            conn.createStatement(
                function(err, statement) {
                    if (err) {
                        console.log(err);
                        res.send(err);
                    } else {
                        statement.setFetchSize(100, 
                        function(err) {
                            if (err) {
                                console.log(err);
                                res.send(err);
                            } else {
                                statement.executeQuery(query,
                                function(err, resultset) {
                                    if (err) {
                                        console.log(err);
                                        res.send(err);
                                    } else {
                                        resultset.toObjArray(
                                            function(err, results) {
                                                res.send(JSON.stringify(results));
                                                console.log(results)
                                            }
                                        );
                                        
                                    }
                                });
                            }
                        });
                    }
            });
            psql_pool.release(connObj, function(err) {
                if (err) {
                    console.log(err.message)
                }
            });
        };
    });
});


module.exports = router;