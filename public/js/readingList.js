/*
 * Title: Reading List
 * Description: Add Blogs to Reading List
 * Author: Istiak Ahammad
 * Date: 9/6/2024
 *
 */

/**
 * custom module
 **/
import dialog from "./dialog.js";


// Select Reading List Button
const readingListBtn = document.querySelector("[data-reading-list-btn]");
const readingListNumber = document.querySelector("[data-reading-list-number]");

// Add Blog to reading list
const addToReadingList = async () => {
  try {
    // send put request to the reading lsit end point
    const response = await fetch(`${window.location}/readingList`, {
      method: "PUT",
    });
    // Handle case where response is ok
    if (response.ok) {
      readingListBtn.classList.add("active");

      readingListNumber.textContent = Number(readingListNumber.textContent) + 1;
    }

    // Handle case where response is unatherize
    if (response.status === 401) {
      const Dialog = dialog({
        title: "Login to continue",
        content:
          "We're a place where coders share, stay up-to-date and grow their careers.",
      });
      document.body.appendChild(Dialog);
      const dialogAllToggler = document.querySelectorAll(
        "[data-dialog-toggler]"
      );

      dialogAllToggler.forEach((toggler) => {
        const dialog = document.querySelector(".dialog-root");

        toggler.addEventListener("click", () => {
          dialog.remove();
        });
      });
    }
  } catch (error) {
    console.log("Reading List Error: ", error.message);
  }
};

// Remove Blog to reading list
const removeFromReadingList = async () => {
  try {
    // send delete request to the reading lsit end point
    const response = await fetch(`${window.location}/readingList`, {
      method: "DELETE",
    });
    // Handle case where response is ok
    if (response.ok) {
      readingListBtn.classList.remove("active");

      readingListNumber.textContent = Number(readingListNumber.textContent) - 1;
    }

    // Handle case where response is unatherize
    if (response.status === 401) {
      const Dialog = dialog({
        title: "Login to continue",
        content:
          "We're a place where coders share, stay up-to-date and grow their careers.",
      });
      document.body.appendChild(Dialog);
      const dialogAllToggler = document.querySelectorAll(
        "[data-dialog-toggler]"
      );

      dialogAllToggler.forEach((toggler) => {
        const dialog = document.querySelector(".dialog-root");

        toggler.addEventListener("click", () => {
          dialog.remove();
        });
      });
    }
  } catch (error) {
    console.log("Reading List remove Error: ", error.message);
  }
};

// Add event listener
readingListBtn.addEventListener("click", async () => {
  readingListBtn.setAttribute("disabled", "");
  if (!readingListBtn.classList.contains("active")) {
    await addToReadingList();
  } else {
    await removeFromReadingList();
  }
  readingListBtn.removeAttribute("disabled");
});
