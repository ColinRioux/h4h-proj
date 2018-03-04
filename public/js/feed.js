$ = require('jquery');
var fs = require('fs');

$(document).ready(function() {
    var tmp = JSON.parse(fs.readFileSync('./local/tmp.json', 'utf8'));
    for (var i in tmp.requests) {
        var request = tmp.requests[i];
        // var tags = tmp.requests[i].tags.split(',');
        // for (var j in tmp.requests[i].category) {
            
        // }
        $('#feed').append('<div class="box" style="width:50%;"><h1 class="title is-4">'+request.title+'</h1><ul class="bxlc"><li><i class="fas fa-users"></i> Size:' + request.size + '</li><li><i class="fas fa-map-marker"></i> Location: ' + request.location + '</li></ul><br/><p style="padding-top:2%">' + request.description + '</p><br/><ul class="tgclist"><li><div class="jobCategory">Supplies</div></li><li style="padding-left:30px;"><i class="fas fa-tags"></i></li></ul></div>');
        // for (var j in tags) {
        //     $('#feed').append('<li><div class="jobTag">' + tags[j] + '</div></li>');
        // }
        
    }
});