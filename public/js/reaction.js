/*
 * Title: Blog Reaction
 * Description: Send PUT request to sever for reaction
 * Author: Istiak Ahammad
 * Date: 9/62024
 *
 */

/**
 * custom module
 **/

// select reaction button and reaction number
const reactBtn = document.querySelector("[data-reaction-btn]");
const reactNumber = document.querySelector("[data-reaction-number]");

// * Add a reaction to the current blog
const addReaction = async () => {
  try {
    // send put request to the rection end point
    const response = await fetch(`${window.location}/reactions`, {
      method: "PUT",
    });
    // Handle case where response is ok
    if (response.ok) {
      reactBtn.classList.add("active", "reaction-anim-add");
      reactBtn.classList.remove("reaction-anim-remove");
      reactNumber.textContent = Number(reactNumber.textContent) + 1;
    }

    // Handle case where response is unatherize
    if (response.status === 401) {
      console.log("Show Dialog for Login");
    }
  } catch (error) {
    console.log("reaction Error: ", error.message);
  }
};

// * Remove reaction from current blog
const removeReaction = async () => {
  try {
    // Send Delete request to reaction endpoint
    const response = await fetch(`${window.location}/reactions`, {
      method: "DELETE",
    });

    // Handle case where response is ok
    if (response.ok) {
      reactBtn.classList.add("reaction-anim-remove");
      reactBtn.classList.remove("active", "reaction-anim-add");

      reactNumber.textContent = Number(reactNumber.textContent) - 1;
    }
  } catch (error) {
    console.log("error to remove rection: ", error.message);
  }
};

// Add event listener
reactBtn.addEventListener("click", async () => {
  reactBtn.setAttribute("disabled", "");
  if (!reactBtn.classList.contains("active")) {
    await addReaction();
  }
  else{
    await removeReaction()
  }
  reactBtn.removeAttribute("disabled");
});
