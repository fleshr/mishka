let mainNav = document.querySelector(".main-nav");
let mainNavBtn = document.querySelector(".main-nav__toogle");

mainNav.classList.remove("main-nav--nojs");
mainNavBtn.addEventListener("click", function (e) {
  e.preventDefault();
  mainNav.classList.toggle("main-nav--closed");
});
