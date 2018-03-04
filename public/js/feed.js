$ = require('jquery');
var fs = require('fs');
var btn = document.getElementById("btnfilter");
var file = fs.readFileSync('./local/tmp.json', 'utf8')
var data = JSON.parse(file);

btn.onclick = function() {
    filter();
}

var search = "Food";

function filter() {
    $('.searchfield').html("");
    // var search = "Evac";
    search = document.getElementById("filter").value;
    for(var req in data.requests){
        
        if(search == ""){
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

$(document).ready(function() {
    filter();

});