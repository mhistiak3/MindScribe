/*
 * Title: MindScribe Application
 * Description: Registration for handle
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
  //  Handling cas where pasword and confirm password fields donsn't match
  if (formData.get("password") !== formData.get("confirm_password")) {
    // Enable submit button adn show error
    submitBtn.removeAttribute("disabled");
    Snackbar({
      type: "error",
      message:
        "please ensure your pasword and confirm password fields contain the same value",
    });
    return;
  }

  // * requset to ser for register new user

  const body = new URLSearchParams(
    Object.fromEntries(formData.entries())
  ).toString();

  const response = await fetch(`${location.origin}/register`, {
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
