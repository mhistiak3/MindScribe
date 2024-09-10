/*
 * Title: Edit Blog
 * Description: Submit Edited blog data
 * Author: Istiak Ahammad
 * Date: 9/9/2024
 *
 */

/**
 * import module
 **/
import imagePreviewFunction from "./utilities/imagePreview.js";
import Snackbar from "./snackbar.js";
import config from "./config.js";
import imageAsDataURL from "./utilities/imageAsDataURL.js";

// Selector for image field, image preview, and clear preview button
const imageField = document.querySelector("[data-image-filled]");
const imagePreview = document.querySelector("[data-image-preview]");
const imagePreviewClear = document.querySelector("[data-image-preview-clear]");

// Event listener for image field change to trigger image preview
imageField.addEventListener("change", () => {
  imagePreviewFunction(imageField, imagePreview);
});

// Clears the image preview by removing the show class from the preview container
function clearImagePreview() {
  imagePreview.classList.remove("show");
  imagePreview.innerHTML = "";
}
imagePreviewClear.addEventListener("click", clearImagePreview);

/**
 *  Handle Updated Blog
 **/
const form = document.querySelector("[data-form]");
const submitBtn = document.querySelector("[data-publish-btn]");
const progressBar = document.querySelector("[data-progress-bar]");

// Update Blog
async function handleUpdateBlog(event) {
  event.preventDefault();
  submitBtn.setAttribute("disabled", "");

  // FormData object to capture form data
  const formData = new FormData(form);

  if (formData.get("banner").size || imagePreview.classList.contains("show")) {
    // If Image Size is less then 5MB
    if (formData.get("banner").size < config.blogBanner.maxByteSize) {
      // Handle case when user not update banner value
      if (!formData.get("banner").size && imagePreview.hasChildNodes()) {
        formData.delete("banner");
      }
      //   Handlecase where user update blog banner
      if (formData.get("banner")) {
        formData.set("banner", await imageAsDataURL(formData.get("banner")));
      }

      // create Request Body
      const body = JSON.stringify(Object.fromEntries(formData.entries()));
      // Show progressBar loading
      progressBar.classList.add("loading");

      // Send Request to server
      const response = await fetch(`${window.location.href}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      // handle case where response is ok
      if (response.ok) {
      submitBtn.removeAttribute("disabled");

        Snackbar({ message: "Your blog has been updated." });
        // Show progressBar loading-end
        progressBar.classList.add("loading-end");
        // redirect to creted blog page
        console.log(response);
        
        window.location = response.url.replace("/edit", "");
        return 
      }

    //   Handle case when response is 400
      if (response.status === 400) {
        publisheBtn.removeAttribute("disabled");
        progressBar.classList.add("loading-end");
        const { message } = await response.json();
        Snackbar({ type: "error", message });
      }
    } else {
      // If Image Size is greter then 5MB. Enable publish button and show error message
      submitBtn.removeAttribute("disabled");
      Snackbar({
        type: "error",
        message: "Image should be less then 5MB.",
      });
    }
  } else {
    // Enable publish button and show error message
    submitBtn.removeAttribute("disabled");
    Snackbar({
      type: "error",
      message: "You didn't select any image for blog banner.",
    });
  }
}
form.addEventListener("submit", handleUpdateBlog);
