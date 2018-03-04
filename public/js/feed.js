$ = require('jquery');
var fs = require('fs');

$(document).ready(function() {
    buildFeed('#feed', 't');
    $('#btnfilter').click(function() {
        filter();
    });
    $('#refreshJobs').click(function() {
        buildFeed('#feed');
    });
});

function buildFeed(selector) {
    var tmp = JSON.parse(fs.readFileSync('./local/tmp.json', 'utf8'));
    $(selector).html('');
    for (var i in tmp.requests) {
        var request = tmp.requests[i];
        $(selector).append('<div class="box ' + request.id +'" style="width:50%;"><h1 class="title is-4">'+request.title+'</h1><ul class="bxlc"><li><i class="fas fa-users"></i> Size:' + request.size + '</li><li><i class="fas fa-map-marker"></i> Location: ' + request.location + '</li></ul><br/><p style="padding-top:2%">' + request.description + '</p><br/><ul class="tgclist"></ul><br/><a href="/job" class="button is-info">Inspect</a></div>');
        if (typeof request.category === "string") {
            var a = [];
            a.push(request.category);
            request.category = a;
        } 
        for (var j in request.category) {
            $(selector).find('.' + request.id + '').find('.tgclist').append('<li><div class="jobCategory">' + request.category[j] + '</div></li>');
        }
        $(selector).find('.' + request.id + '').find('.tgclist').append('<li style="padding-left:30px;"><i class="fas fa-tags"></i></li>');
        for (var k in request.tags) {
            $(selector).find('.' + request.id + '').find('.tgclist').append('<li><div class="jobTag">' + request.tags[k] + '</div></li>'); 
        }
    }
}

function filter() {
    $('.searchfield').html('');
    var search = $("#filter").val();
    $('#feed').html('');
    $('#feed').append('<p>' + search + '</p>');
    // buildFeed('.searchfield', true);
    for(var req in tmp.requests){
        var request = tmp.requests[req];
        if(search == "Search..."){
            $('#feed').append('<p>' + request.title + '</p>');
        } else {
            var tags = request.tags;
            for(var t in tags){
                if(tags[t] == search){
                    $('#feed').append('<p>' + request.title + '</p>');
                }
            }
        }
    }
    
    // $('body').append('<p>' + search + '</p>');
}

function expandCard(id) {
    window.location.replace('/job');
}