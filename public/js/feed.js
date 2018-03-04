$ = require('jquery');
var fs = require('fs');
var tmp = JSON.parse(fs.readFileSync('./local/tmp.json', 'utf8'));
var search = "";

$(document).ready(function() {
    buildFeed();
    $('#btnfilter').click(function() {
        filter();
    })
    window.setInterval(function() {
        buildFeed();
    }, 10000);
});

function buildFeed() {
    $('#feed').html('');
    for (var i in tmp.requests) {
        var request = tmp.requests[i];
        $('#feed').append('<div class="box ' + request.id +'" style="width:50%;"><h1 class="title is-4">'+request.title+'</h1><ul class="bxlc"><li><i class="fas fa-users"></i> Size:' + request.size + '</li><li><i class="fas fa-map-marker"></i> Location: ' + request.location + '</li></ul><br/><p style="padding-top:2%">' + request.description + '</p><br/><ul class="tgclist"></ul></div>');
        if (typeof request.category === "string") {
            var a = [];
            a.push(request.category);
            request.category = a;
        } 
        for (var j in request.category) {
            $('.' + request.id + '').find('.tgclist').append('<li><div class="jobCategory">' + request.category[j] + '</div></li>');
        }
        $('.' + request.id + '').find('.tgclist').append('<li style="padding-left:30px;"><i class="fas fa-tags"></i></li>');
        for (var k in request.tags) {
            $('.' + request.id + '').find('.tgclist').append('<li><div class="jobTag">' + request.tags[k] + '</div></li>');
        }
    }
} 

function filter() {
    $('.searchfield').html("");
    search = $("#filter").val();
    $('.searchfield').append('<p>' + search + '</p>');
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