const express = require('express');
const psql_pool = require('../models/psql_pool');

const router = new express.Router();

router.post('/executeQuery', function(req, res, next) {
    console.log('request data', req.body);
    const query = req.body.query;
    psql_pool.reserve(function(err, connObj) {
        if (connObj) {
            console.log("Using connection: " + connObj.uuid);
            var conn = connObj.conn;
            conn.createStatement(
                function(err, statement) {
                    if (err) {
                    console.log(err);
                    } else {
                        statement.setFetchSize(100, 
                        function(err) {
                            if (err) {
                                console.log(err);
                            } else {
                                statement.executeQuery(query,
                                function(err, resultset) {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        resultset.toObjArray(
                                            function(err, results) {
                                                res.send(JSON.stringify(results))
                                                console.log('here are the results', results)
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
   
    // res.send('You hit the executeQuery route correctly')
});


module.exports = router;