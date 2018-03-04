$ = require('jquery');
var fs = require('fs');

$(document).ready(function() {
  var tmp = JSON.parse(fs.readFileSync('./local/tmp.json', 'utf8'));
  $('.jobTitle').append('<h1>' + tmp.requests[0].title + '</h1>');
  $('.jobSize').append('<p>' + 'Job Size: '+tmp.requests[0].size + '</p>');
  $('.jobDescription').append('<p>' +tmp.requests[0].description + '</p>');
  $('.jobCategory').append('<h3>' +tmp.requests[0].category + '</h3>');

// Requirement list removed

  $('.jobLocation').append('<p>' + '<b><strong>Job Location: </strong></b><br>' +tmp.requests[0].location + '</p>');
  $('.contactInformation').append('<h4>' + 'Requesting Organization Contact Information: <br>' + tmp.requests[0].contact + '</h4>');
  // $('.Tag').append('<small>' +tmp.requests[0].title + '</small>'); //could be tag
  // $('.Date').append('<small>' +tmp.requests[0].title + '</small>');
});
