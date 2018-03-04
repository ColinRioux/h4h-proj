$ = require('jquery');
var fs = require('fs');
var btn = document.getElementById("btnfilter");

var search = "";
btn.onclick = function() {
    filter();
};

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
    var tmp = JSON.parse(fs.readFileSync('./local/tmp.json', 'utf8'));
    for (var i in tmp.requests) {
        var request = tmp.requests[i];
        // var tags = tmp.requests[i].tags.split(',');
        // for (var j in tmp.requests[i].category) {
            
        // }
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
        // for (var j in tags) {
        //     $('#feed').append('<li><div class="jobTag">' + tags[j] + '</div></li>');
        // }
    }
} 

function filter() {
    // $('.searchfield').html("");
    // var search = "Evac";
    search = document.getElementById("filter").value;
    $('.searchfield').append('<p>' + search + '</p>');
    for(var req in data.requests){
        
        if(search == "Search..."){
            $('.searchfield').append('<p>' + data.requests[req].title + '</p>');
        } else {
            var tags = data.requests[req].tags;
            for(var t in tags){
                if(tags[t] == search){
                    $('.searchfield').append('<p>' + data.requests[req].title + '</p>');
                }
            }
        }
    }
    
    // $('body').append('<p>' + search + '</p>');
}