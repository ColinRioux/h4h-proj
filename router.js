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

router.get('/create', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/jobs/create.html'));
});

router.get('/feeds', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/feeds.html'));
});

router.get('/job', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/expandedJobView.html'));
});

router.post('/create/post', function(req,res) {
    // Create a req and store it in tmp
    console.log(req.body);
    // var cur = JSON.parse(fs.readFileSync('./local/tmp.json', 'utf8'));
    // cur.requests.push({
    //     id: cur.requests.length,
    //     category: req.body.categoriesSelector,
    //     tags: req.body.tagsInput.split(','),
    //     title: req.body.titleInput,
    //     description: req.body.descriptionInput,
    //     location: req.body.locationInput,
    //     size: req.body.jobSizeSelector,
    //     contact: req.body.contactInput,
    //     time: new Date(Date.now()).toLocaleString(),
    //     claim: null,
    //     status: null
    // });
    // fs.writeFile('./local/tmp.json', JSON.stringify(cur));
    if (typeof req.body.categoriesSelector == 'string') {
        var a = [];
        a.push(req.body.categoriesSelector);
        req.body.categoriesSelector = a;
    }
    db.run('INSERT INTO requests (category, tags, title, description, location, size, contact, time) VALUES (?,?,?,?,?,?,?,?)', req.body.categoriesSelector.join(','), req.body.tagsInput, req.body.titleInput, req.body.descriptionInput, req.body.locationInput, parseInt(req.body.jobSizeSelector), req.body.contactInput, new Date(Date.now()).toLocaleString());
    // browserify('./public/js/feed.js').transform({global: true}, 'uglifyify').transform('brfs').bundle().pipe(fs.createWriteStream('./public/js/dist/feed.min.js'));
    res.redirect('/');
});

router.get('/job', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/expandedJobView.html'));
});

router.get('/', function(req, res) {
    // browserify('./public/js/feed.js').transform({global: true}, 'uglifyify').transform('brfs').bundle().pipe(fs.createWriteStream('./public/js/dist/feed.min.js'));
    // res.set('Content-Type', 'text/html');
    // var html = fs.readFileSync('./views/feeds.html');
    // res.send(html);
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
                time: row.time
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
module.exports = router;
