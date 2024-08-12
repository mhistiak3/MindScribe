/*
 * Title: Snackbar
 * Description: ALert Snackbar
 * Author: Istiak Ahammad
 * Date: /12/2024
 *
 */

const snackbarWrapper = document.querySelector("[data-snackbar-wrapper]");
let lasteTimeout = null;

const Snackbar = (props) => {
  const snackbar = document.createElement("div");
  snackbar.classList.add("snackbar");
  props.type && snackbar.classList.add(props.type);
  snackbar.innerHTML = `
    <p class="body-medium snackbar-text">${props.message}</p>
  `;

  //   clear previus snackbar and append new one
  snackbarWrapper.innerHTML = "";
  snackbarWrapper.append(snackbar);

  //   remove snackbar
  clearTimeout(lasteTimeout);
  lasteTimeout = setTimeout(() => {
    snackbarWrapper.removeChild(snackbar);
  }, 10000);
};

export default Snackbar;
