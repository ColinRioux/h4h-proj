// index.html home page stuffs
$ = require('jquery');
var fs = require('fs');

$(document).ready(function() {
    var categories = JSON.parse(fs.readFileSync('./local/job_builder.json', 'utf8')).categories;
    for (var c in categories) {
        $('#categoriesSelector').append($('<option/>', {
            value: c,
            text: categories[c] 
        }));
    }

    // var data = fs.readFileSync('./local/tmp.json', 'utf8');
    // var interact = JSON.parse(data);
    // $('body').html(interact.requests[0].title);
});