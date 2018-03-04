// handle jobs
$ = require('jquery');
var fs = require('fs');

$(document).ready(function() {
    var job_builder = JSON.parse(fs.readFileSync('./local/job_builder.json', 'utf8'));
    updateCategories(job_builder);
    updateJobSizes(job_builder);
});

/* 
    Functions which update from job_builder config
*/
function updateCategories(d) {
    for (var c in d.categories) {
        $('#categoriesSelector').append($('<option/>', {
            value: d.categories[c],
            text: d.categories[c] 
        }));
    }
} 

function updateJobSizes(d) {
   for (var c in d.sizes) {
        $('#jobSizeSelector').append($('<option/>', {
            value: parseInt(c) + 1,
            text: d.sizes[c]
        }));
    } 
}