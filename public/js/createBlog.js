/*
 * Title: Post Submission Handle
 * Description: Handle Blog post Submission to server
 * Author: Istiak Ahammad
 * Date: 8/13/2024
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

// Event listener for image field change to trigger image previes
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
 *  Handle Blog Published
 **/
const form = document.querySelector("[data-form]");
const publisheBtn = document.querySelector("[data-publish-btn]");
const progressBar = document.querySelector("[data-progress-bar]");
async function handlePublishBlog(event) {
  event.preventDefault();
  publisheBtn.setAttribute("disabled", "");

  // FormData object to capture form data
  const formData = new FormData(form);

  if (formData.get("banner").size && imagePreview.classList.contains("show")) {
    if (formData.get("banner").size < config.blogBanner.maxByteSize) {
      // If Image Upload and Size is less then 5MB
      /**
       *  Overwrite banner value (which is type of 'File') to base64
       **/
      formData.set("banner", await imageAsDataURL(formData.get("banner")));

      const body = JSON.stringify(Object.fromEntries(formData.entries()));
      // Show progressBar loading
      progressBar.classList.add("loading");

      const response = await fetch(`${window.location.origin}/createblog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      // handle case where response is ok
      if (response.ok) {
        console.log('c');
        
        Snackbar({ message: "Your blog has been creted." });
        // Show progressBar loading-end
        progressBar.classList.add("loading-end");
        // redirect to creted blog page
        return (window.location = response.url);
      }
      if (response.status === 400) {
        publisheBtn.removeAttribute("disabled");
        progressBar.classList.add("loading-end");
        const { message } = await response.json();
        Snackbar({type:"error", message });

      }
    } else {
      // Enable publish button and show error message
      publisheBtn.removeAttribute("disabled");
      Snackbar({
        type: "error",
        message: "Image should be less then 5MB.",
      });
    }
  } else {
    // Enable publish button and show error message
    publisheBtn.removeAttribute("disabled");
    Snackbar({
      type: "error",
      message: "You didn't select any image for blog banner.",
    });
  }
}
form.addEventListener("submit", handlePublishBlog);
