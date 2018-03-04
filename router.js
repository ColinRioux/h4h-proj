var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');

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
        tags: req.body.tagsInput,
        title: req.body.titleInput,
        description: req.body.descriptionInput,
        location: req.body.locationInput,
        size: req.body.jobSizeSelector,
        contact: req.body.contactInput
    });
    fs.writeFile('./local/tmp.json', JSON.stringify(cur));
    res.redirect('/create');
});

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

router.get('/update', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/update.html'));
});

module.exports = router;
