/*
 * Title: Settings Request
 * Description:  Send Profile update request to server
 * Author: Istiak Ahammad
 * Date: 15/9/2024
 *
 */

/**
 * import module
 **/
import Snackbar from "./snackbar.js";
import imagePreviewFunction from "./utilities/imagePreview.js";
import config from "./config.js";
import imageAsDataURL from "./utilities/imageAsDataURL.js";

// selector for image field
const imageField = document.querySelector("[data-image-field]");
const imagePreview = document.querySelector("[data-image-preview]");
const imagePreviewClear = document.querySelector("[data-image-preview-clear]");

// Event for image preview
imageField.addEventListener("change", () => {
  imagePreviewFunction(imageField, imagePreview);
});

// Clear image preview
function clearImagePreview() {
  imagePreview.classList.remove("show");
  imagePreview.innerHTML = "";
  imageField.value = "";
}
imagePreviewClear.addEventListener("click", clearImagePreview);

// basic info update functionality
const basicInfoForm = document.querySelector("[data-basic-info-form]");
const basicInfoSubmit = document.querySelector("[data-basic-info-form]");
const oldFormData = new FormData(basicInfoForm);
const progressBar = document.querySelector("[data-progress-bar]");

// update basic info
const basicInfoUpdate = async (event) => {
  event.preventDefault();
  // disabled submit button
  basicInfoSubmit.setAttribute("disabled", "");

  //   Make form data and handle it
  const formData = new FormData(basicInfoForm);
  if (formData.get("profilePhoto").size > config.profilePhoto.maxByteSize) {
    // show error message
    basicInfoSubmit.removeAttribute("disabled");
    Snackbar({
      type: "error",
      message: "Your profile photo should be less then 1MB",
    });
    return;
  }

  // Handle case when user not selected any image
  if (!formData.get("profilePhoto").size) {
    formData.delete("profilePhoto");
  }
  // Handle case where profile photo field exist

  if (formData.get("profilePhoto")?.size) {
    formData.set("profilePhoto", await imageAsDataURL(imageField.files[0]));
  }

  //   Handle case when user did not change username
  if (formData.get("username") === oldFormData.get("username")) {
    formData.delete("username");
  }
  //   Handle case when user did not change email
  if (formData.get("email") === oldFormData.get("email")) {
    formData.delete("email");
  }

  //   create a request body
  const body = JSON.stringify(Object.fromEntries(formData.entries()));

  //   show progress bar
  progressBar.classList.add("loading");

  const response = await fetch(`${window.location.href}/basic-info`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  //   response ok
  if (response.ok) {
    basicInfoSubmit.removeAttribute("disabled");
    progressBar.classList.add("loading-end");
    Snackbar({ message: "Your profile has been updated." });
    window.location.reload();
  }
  //   Handle case where reponse is not ok
  if (response.status === 400) {
    basicInfoSubmit.removeAttribute("disabled");
    progressBar.classList.add("loading-end");
    const { message } = await response.json();
    Snackbar({ type: "error", message });
  }
};

// Submit form
basicInfoForm.addEventListener("submit", basicInfoUpdate);

// Change Password functionality
const passwordForm = document.querySelector("[data-password-form]");
const passwordSubmit = document.querySelector("[data-password-submit]");

const updatePassword = async (event) => {
  event.preventDefault();
  // disabled submit button
  passwordSubmit.setAttribute("disabled", "");

  // Make form data and handle it
  const formData = new FormData(passwordForm);

  //   Handle case where password and confirm password not same
  if (formData.get("password") !== formData.get("confirm-password")) {
    passwordSubmit.removeAttribute("disabled");
    Snackbar({
      type: "error",
      message:
        "Please ensure your password nad confirm password fields contain the same value.",
    });
    return;
  }

  progressBar.classList.add("loading");
  const body = JSON.stringify(Object.fromEntries(formData.entries()));

  // Send password form data to server
  const response = await fetch(`${window.location.href}/password`, {
    method: "PUT",
    body,
  });

  //   response ok
  if (response.ok) {
    passwordSubmit.removeAttribute("disabled");
    progressBar.classList.add("loading-end");
    Snackbar({ message: "Your password has been updated." });
    return;
  }
  //   Handle case where reponse is not ok
  if (response.status === 400) {
    passwordSubmit.removeAttribute("disabled");
    progressBar.classList.add("loading-end");
    const { message } = await response.json();
    Snackbar({ type: "error", message });
  }
};

passwordForm.addEventListener("submit", updatePassword);
