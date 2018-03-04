var modal = document.getElementById('updateModal');
var btn = document.getElementById('updateBtn');
var span = document.getElementById('close')[0];

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
