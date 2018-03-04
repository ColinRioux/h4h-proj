$ = require('jquery');
var fs = require('fs');
var search = "";

$(document).ready(function() {
    buildFeed('#feed', false);
    $('#btnfilter').click(function() {
        search = $('#filter').val();
        buildFeed('#feed', true);
    });
    $('#refreshJobs').click(function() {
        buildFeed('#feed', false);
    });
});

function buildFeed(selector, s) {
    var tmp = JSON.parse(fs.readFileSync('./local/tmp.json', 'utf8'));
    $(selector).html('');
    for (var i in tmp.requests) {
        var request = tmp.requests[i];
        var o = true;
        if (s) {
            o = false;
            for (var t in request.tags) {
                if (tags[t] == search) {
                    o = true;
                } 
            }
        }
        if (o) {
           $(selector).append('<div class="box ' + request.id +'" style="width:50%;" onclick="expandCard' + request.id + '"><h1 class="title is-4">'+request.title+'</h1><ul class="bxlc"><li><i class="fas fa-users"></i> Size:' + request.size + '</li><li><i class="fas fa-map-marker"></i> Location: ' + request.location + '</li></ul><br/><p style="padding-top:2%">' + request.description + '</p><br/><ul class="tgclist"></ul></div>');
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
}

function filter() {
    $('.searchfield').html('');
    search = $("#filter").val();
    //$('.searchfield').append('<p>' + search + '</p>');
    // buildFeed('.searchfield', true);
    for(var req in tmp.requests){
        var request = tmp.requests[req];
        if(search == "Search..."){
            $('.searchfield').append('<p>' + request.title + '</p>');
        } else {
            var tags = request.tags;
            for(var t in tags){
                if(tags[t] == search){
                    $('.searchfield').append('<p>' + request.title + '</p>');
                }
            }
        }
    }
    
    // $('body').append('<p>' + search + '</p>');
}

function expandCard(id) {

}