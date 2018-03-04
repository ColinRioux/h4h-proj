$ = require('jquery');
var fs = require('fs');
$(document).ready(function() {
    // var categories = JSON.parse(fs.readFileSync('./local/job_builder.json', 'utf8')).categories;
    // for (var c in categories) {
    //     $('#categoriesSelector').append($('<option/>', {
    //         value: c,
    //         text: categories[c] 
    //     }));
    // }

    var file = fs.readFileSync('./local/tmp.json', 'utf8')
    var data = JSON.parse(file);
    for(var req in data.requests){
        
        $('body').append('<p>' + data.requests[req].title + '</p>');
    }
    
});