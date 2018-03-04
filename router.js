var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var browserify = require('browserify');

router.get('/create', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/jobs/create.html'));
});

router.post('/create/post', function(req,res) {
    // Create a req and store it in tmp
    console.log(req.body);
    var cur = JSON.parse(fs.readFileSync('./local/tmp.json', 'utf8'));
    cur.requests.push({
        id: cur.requests.length,
        category: req.body.categoriesSelector,
        tags: req.body.tagsInput.split(','),
        title: req.body.titleInput,
        description: req.body.descriptionInput,
        location: req.body.locationInput,
        size: req.body.jobSizeSelector,
        contact: req.body.contactInput,
        time: new Date(Date.now()).toLocaleString(),
        claim: null,
        status: null
    });
    fs.writeFile('./local/tmp.json', JSON.stringify(cur));
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

module.exports = router;