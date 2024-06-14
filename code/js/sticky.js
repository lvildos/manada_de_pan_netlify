window.onscroll = function() {myFunction()};

var nav2 = document.querySelector(".nav2");
var sticky = nav2.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    nav2.classList.add("sticky")
  } else {
    nav2.classList.remove("sticky");
  }
}