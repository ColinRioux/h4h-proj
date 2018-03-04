var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

router.get('/update', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/update.html'));
});

module.exports = router;
