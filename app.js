// Express entry point file
const express = require('express');
const app = express();

app.get('/', function(req,res) {
    res.send('Hi Charles <3');
});

app.listen(3000, function() {
    console.log('App running on local host port 3000');
    console.log('Either localhost:3000');
    console.log('Or 127.0.0.1:3000');
});