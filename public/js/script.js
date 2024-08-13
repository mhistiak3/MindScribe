/*
 * Title: MindScribe
 * Description: Frontend js
 * Author: Istiak Ahammad
 * Date: 8/13/2024
 *
 */

const topAppBar = document.querySelector("[data-top-app-bar]");
let lastScrollPos = 0;

/**
 * Attaches even listener to the window scroll event, toggling classes on the top app bar based on scroll position.
 **/
window.addEventListener("scroll", (event) => {
  topAppBar.classList[window.scrollY > 50 ? "add" : "remove"]("active");
  topAppBar.classList[
    window.scrollY > lastScrollPos && window.scrollY > 50 ? "add" : "remove"
  ]("hide");
  lastScrollPos = window.scrollY;
});

/**
 *  Toggle Menu
 **/
const menuWrappers = document.querySelectorAll("[data-menu-wrapper]");

menuWrappers?.forEach((menuWrapper) => {
  const menuToggler = menuWrapper.querySelector("[data-menu-toggler]");
  const menu = menuWrapper.querySelector("[data-menu]");

  menuToggler.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
});
