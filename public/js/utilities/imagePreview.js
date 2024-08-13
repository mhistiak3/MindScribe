/*
 * Title: MindScribe Utilities
 * Description:  Image Previwe After Upload
 * Author: Istiak Ahammad 
 * Date: 
 *
 */

const imagePreviewFunction = async function (imageField, imagePreview) {
   const imageObjectUrl = URL.createObjectURL(imageField.files[0])
   
   const image = document.createElement("img")
   image.classList.add("img-cover")
   image.src = imageObjectUrl
   imagePreview.append(image);
   imagePreview.classList.add("show")
   
    return imageObjectUrl;
};


export default imagePreviewFunction;