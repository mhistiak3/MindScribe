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

/**
 *  Backward button functionality
 **/
const backBtn = document.querySelector("[data-back-btn]");
function handleBackward() {
  window.history.back();
}

backBtn?.addEventListener("click", handleBackward);

/**
 *  Auto height textarea in blog create form
 **/
const autoHeightTextarea = document.querySelector(
  "[ data-textarea-auto-height]"
);
function textAreaAutoHeight() {
  this.style.height = this.scrollHeight + "px"
  this.style.maxHeight = this.scrollHeight + "px"
}
autoHeightTextarea?.addEventListener("input", textAreaAutoHeight);

// set initial textarea height
autoHeightTextarea && textAreaAutoHeight.call(autoHeightTextarea);