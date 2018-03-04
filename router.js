var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var browserify = require('browserify');

var sqlite3 = require('sqlite3').verbose();
var sqliteJson = require('sqlite-json');
var db = new sqlite3.Database('./local/main.db');
var exp = sqliteJson(db);

// var jquery = require('jquery');

router.get('/create', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/jobs/create.html'));
});

router.get('/feeds', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/feeds.html'));
});

router.get('/job', function(req, res) {
    // var file = fs.readFileSync('./views/expandedJobView.html', 'utf8');
    // var p = jquery.parseHtml(file);
    res.sendFile(path.join(__dirname + '/views/expandedJobView.html'));
});

router.post('/create/post', function(req,res) {
    // Create a req and store it in tmp
    console.log(req.body);
    if (typeof req.body.categoriesSelector == 'string') {
        var a = [];
        a.push(req.body.categoriesSelector);
        req.body.categoriesSelector = a;
    }
    db.run('INSERT INTO requests (category, tags, title, description, location, size, contact, time, claim) VALUES (?,?,?,?,?,?,?,?,?)', req.body.categoriesSelector.join(','), req.body.tagsInput, req.body.titleInput, req.body.descriptionInput, req.body.locationInput, parseInt(req.body.jobSizeSelector), req.body.contactInput, new Date(Date.now()).toLocaleString(), 'null');
    res.redirect('/');
});

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/feeds.html'));
});

router.get('/requests/:id', function(req, res) {
    var id = req.params.id;
    db.get(`SELECT * FROM requests WHERE rowid = ${id} ORDER BY ROWID ASC LIMIT 1`, function(err, row) {
        if (err) {
            console.log(err);
        } else {
            res.send({
                id: id,
                title: row.title,
                description: row.description,
                location: row.location,
                contact: row.contact,
                size: row.size,
                category: row.category.split(','),
                tags: row.tags.split(','),
                time: row.time,
                claim: row.claim
            });
        }
    });
    return;
})

router.get('/requests', function(req, res) {
    db.get('SELECT Count(*) FROM requests', function(err, row) {
        if (err) {
            console.log(err);
        } else {
            res.send({
                count: row['Count(*)']
            });
        }
    });
    return;
});

router.get('/requests/claim/:id/:org', function(req,res) {
    var id = req.params.id;
    var organization = req.params.org + '';
    db.run('UPDATE requests SET claim=? WHERE rowid=?', organization, id, function(err, rows) {
        if (err) console.log(err);
    });
    res.redirect('/');
    return;
});
module.exports = router;
