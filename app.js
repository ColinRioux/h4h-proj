// Express entry point file
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var browserify = require('browserify');
var path = require('path');
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./local/main.db');
db.serialize(function() {
    // serialize table if it doesn't exist
    db.run('CREATE TABLE IF NOT EXISTS requests (category TEXT, tags TEXT, title TEXT, description TEXT, location TEXT, size INTEGER, contact TEXT, time TEXT, claim TEXT)');
});
db.close();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('etag', false);

var route_handler = require('./router');
app.use('/', route_handler);

var files = ['createJob', 'feed', 'expandedJobView'];
for (var f in files) {
    browserify('./public/js/' + files[f] + '.js').transform({global: true}, 'uglifyify').transform('brfs').bundle().pipe(fs.createWriteStream('./public/js/dist/' + files[f] + '.min.js'));
}


app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res) {
    var error = new Error('Not Found');
    error.status = 404;
    res.send(error);
});
app.use(function(req, res, next) {
  //delete all headers related to cache
  req.headers['if-none-match'] = '';
  req.headers['if-modified-since'] = '';
  next();    
});
app.listen(3000, function() {
    console.log('App running on local host port 3000');
    console.log('Either localhost:3000 Or 127.0.0.1:3000');
});
