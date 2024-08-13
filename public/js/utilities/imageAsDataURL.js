/*
 * Title: Image As Data URL
 * Description: Convert given image into a blob URL
 * Author: Istiak Ahammad
 * Date: 8/14/2024
 *
 */

const imageAsDataURL = (imageBlog) => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(imageBlog);

  return new Promise((resolve, reject) => {
    fileReader.addEventListener("load", () => {
      resolve(fileReader.result);
    });

    fileReader.addEventListener("error", () => {
      reject(fileReader.error);
    });
  });
};
export default imageAsDataURL;
