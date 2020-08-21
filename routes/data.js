const express = require('express');
const router = new express.Router();

router.post('/format', function(req, res, next) {
    console.log('hit the format route', req.body);
    const data = {
        key: 'blah'
    }
    res.send(JSON.stringify(data));
});


module.exports = router;