var modal = document.getElementById('updateModal');
var btn = document.getElementById("updateBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function(){
  modal.style.display = "none";
}

window.onclick = function(event){
  if(event.target == modal){
    modal.style.display = "none";
  }
}

$ = require('jquery');
var fs = require('fs');
$(document).ready(function(){
  var file = fs.readFileSync('./local/tmp.json', 'utf8');
  var temp = JSON.parse(file);
  document.getElementById("jobTitle").innerHTML = temp.requests[0].title;
  document.getElementById("organization").innerHTML = temp.requests[0].claimed;
  document.getElementById("deliveryStatus").innerHTML = temp.requests[0].status;
  // $('.jobTitle').append("hi");
  // $('.organization').append('<p>' + temp.requests[0].claim + '</p>');
  // $('.deliveryStatus').append('<p>' + temp.requests[0].status + '</p>');
});
