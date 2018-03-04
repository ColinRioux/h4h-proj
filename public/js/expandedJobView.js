$ = require('jquery');
var fs = require('fs');

function toggle_visibility(id) {
   var e = document.getElementById(id);
   if(e.style.display == 'block')
      e.style.display = 'none';
   else
      e.style.display = 'block';
}
// function openNav() {
//     document.getElementById("myNav").style.width = "100%";
// }
// toggle_visibility('popupBox');

$(document).ready(function() {
  var tmp;
  $.ajax({
    url: window.location.origin + '/requests/1',
    dataType: 'json',
    async: false,
    success: function(data) {
      tmp = data;
    }
  });
  if (tmp !== null) {
    // var tmp = JSON.parse(fs.readFileSync('./local/tmp.json', 'utf8'));
    $('.jobTitle').append('<h1 class="title is-1">' + tmp.title + '</h1>');
    if (tmp.claim !== 'null') {
      $('.jobTitle').append('<h6 class="subtitle is-6">Claimed by: ' + tmp.claim + '</h6>');
    } else {
      $('.jobTitle').append('<h6 class="subtitle is-6">Unclaimed</h6>');
    }
    $('#jobSize').append('<p>' + 'Job Size: ' +tmp.size + '</p>');
    $('.jobDescription').append('<p>' +tmp.description + '</p>');
    $('#jobCategory').append('<h3 class="subtitle is-5">' + 'Request Type: ' +tmp.category + '</h3>');

  // Requirement list removed

    $('#jobLocation').append('<p class="notification is-success">' + '<b><strong>Job Location: </strong></b><br>' +tmp.location + '</p>');
    $('.contactInformation').append('<h4>' + 'Requesting Organization Contact Information: <br>' + tmp.contact + '</h4>');

    for(var t in tmp.tags){
     $('.tags').append('<small class="tag is-info">' + tmp.tags[t] + ' ' + '</small>'); //could be tag
    }

    $('.date').append('<small>' + 'Posted on ' +tmp.time + '</small>');
  }
});
