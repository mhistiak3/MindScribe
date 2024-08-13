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
