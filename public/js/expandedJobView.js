$ = require('jquery');
var fs = require('fs');

$(document).ready(function() {
  var tmp = JSON.parse(fs.readFileSync('./local/tmp.json', 'utf8'));
  $('.jobTitle').append('<h1 class="title is-1">' + tmp.requests[0].title + '</h1>');
  $('#jobSize').append('<p>' + 'Job Size: ' +tmp.requests[0].size + '</p>');
  $('.jobDescription').append('<p>' +tmp.requests[0].description + '</p>');
  $('#jobCategory').append('<h3 class="subtitle is-5">' + 'Request Type: ' +tmp.requests[0].category + '</h3>');

// Requirement list removed

  $('#jobLocation').append('<p class="notification is-success">' + '<b><strong>Job Location: </strong></b><br>' +tmp.requests[0].location + '</p>');
  $('.contactInformation').append('<h4>' + 'Requesting Organization Contact Information: <br>' + tmp.requests[0].contact + '</h4>');

  for(var t in tmp.requests[0].tags){
   $('.tags').append('<small class="tag is-info">' + tmp.requests[0].tags[t] + ' ' + '</small>'); //could be tag
  }

  $('.date').append('<small>' + 'Posted on ' +tmp.requests[0].time + '</small>');
});