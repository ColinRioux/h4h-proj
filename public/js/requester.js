$ = require('jquery');
var fs = require('fs');
var search = "";
var counter;

$(document).ready(function() {
    buildRequesterFeed('#feed');
    $('#btnfilter').click(function() {
        search = $('#filter').val();
        buildRequesterFeed('#feed');
    });
    $('#refreshJobs').click(function() {
        buildRequesterFeed('#feed');
    });
});

function expandCard(){
  alert("Hi");
  // var modal = document.getElementById('myModal');
  // var span = document.getElementsByClassName("close")[0];
  // document.getElementById('myModal').style.display='block';
  // span.onclick = function(){
  //   modal.style.display = "none";
  // }
  // window.onclick = function(event){
  //   if(event.target == modal){
  //     modal.style.display = "none";
  //   }
  // }
  // $(document).ready(function(){
  //   var file = fs.readFileSync('./local/tmp.json', 'utf8');
  //   var temp = JSON.parse(file);
  //   document.getElementById("jobTitle").innerHTML = tmp.requests[cardNum].title;
  //   document.getElementById("organization").innerHTML = tmp.requests[cardNum].claimed;
  //   document.getElementById("deliveryStatus").innerHTML = tmp.requests[cardNum].status;
  // });
}

function buildRequesterFeed(selector) {
    var file = fs.readFileSync('./local/tmp.json', 'utf8');
    var tmp = JSON.parse(file);
    for (var i in tmp.requests) {
        var request = tmp.requests[i];
        $(selector).append('<div class="box ' + request.id +'" onclick="expandCard()" style="width:50%;"><h1 class="title is-4">'+request.title+'</h1><ul class="bxlc"><li><i class="fas fa-users"></i> Size:' + request.size + '</li><li><i class="fas fa-map-marker"></i> Location: ' + request.location + '</li></ul><br/><p style="padding-top:2%">' + request.description + '</p><br/><ul class="tgclist"></ul></div>');
        counter = i;
    }
}
