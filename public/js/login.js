/*
 * Title: MindScribe Application
 * Description: Login form handler
 * Author: Istiak Ahammad
 * Date: 8/12/2024
 *
 */

/**
 * import module
 **/
import Snackbar from "./snackbar.js";

// DOM selection
const form = document.querySelector("[data-form]");
const submitBtn = document.querySelector("[data-submit-btn]");

// Handling SingUp form submission
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Disabling submit button to prevent mutiple submission
  submitBtn.setAttribute("disabled", "");

  //   Creating a form FromData object to capture data.
  const formData = new FormData(form);


  // * requset to ser for register new user

  const body = new URLSearchParams(
    Object.fromEntries(formData.entries())
  ).toString();

  const response = await fetch(`${location.origin}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  if (response.ok) {
    return (window.location = response.url);
  }
  if (response.status === 400) {
    submitBtn.removeAttribute("disabled");

    const { message } = await response.json();
    Snackbar({
      type: "error",
      message,
    });
  }
});
