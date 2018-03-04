$ = require('jquery');
var fs = require('fs');

$(document).ready(function() {
    buildFeed('#feed', 't');
    $('#btnfilter').click(function() {
        buildFeed('#feed');
    });
    $('#refreshJobs').click(function() {
        buildFeed('#feed');
    });
});

function buildFeed(selector) {
    $.getJSON(window.location.href + 'requests/', function(data) {
        var count = data.count;
        var tmp = [];
        for (var c = 1; c <= count; c++) {
            $.ajax({
                url: window.location.href + 'requests/' + c,
                dataType: 'json',
                async: false,
                success: function(data) {
                    tmp.push(data);
                }
            });
        }
        // alert(JSON.stringify(a));
        $('.searchfield').html('');
        var search = $("#filter").val();

        $(selector).html('');
        // $('.container').append('<p>' + search + '</p>');
        for (var i in tmp) {
            if(tmp[i].tags.indexOf(search) > -1 || search == null || search == ""){
                var request = tmp[i];
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

    });
    return;
    // var tmp = JSON.parse(fs.readFileSync('./local/tmp.json', 'utf8'));
}
