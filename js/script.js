//https://fridarognstad.one/projectexam/wordpress/wp-json/wp/v2/posts

const hamburger = document.querySelector("#hamburger");
const navUl = document.querySelector("#nav-ul");

hamburger.addEventListener("click", () => {
  navUl.classList.toggle("show");
});
