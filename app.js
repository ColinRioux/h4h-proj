// Express entry point file
var express = require('express');
var app = express();
var bodyParser = require('body-parser');


var route_handler = require('./router');
app.use('/', route_handler);

app.use(function(req, res) {
    var error = new Error('Not Found');
    error.status = 404;
    res.send(error);
});

app.listen(3000, function() {
    console.log('App running on local host port 3000');
    console.log('Either localhost:3000 Or 127.0.0.1:3000');
});