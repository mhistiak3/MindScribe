/*
 * Title: Visits Count
 * Description:  Count Blog visitor
 * Author: Istiak Ahammad
 * Date:
 *
 */

// Get Visited Blogs
let visitedBlogs = localStorage.getItem("visitedBlogs");
if (!visitedBlogs) localStorage.setItem("visitedBlogs", JSON.stringify([]));

visitedBlogs = JSON.parse(localStorage.getItem("visitedBlogs"));

// if user first time
if (!visitedBlogs.includes(window.location.pathname)) {
  countVisit();
}

async function countVisit() {
  try {
    const response = await fetch(`${window.location}/visit`, {
      method: "PUT",
    });
    if (response.ok) {
      visitedBlogs.push(window.location.pathname);
      localStorage.setItem("visitedBlogs", JSON.stringify(visitedBlogs));
    }
  } catch (error) {
    console.log("error counting: ", error.message);
    throw error;
  }
}
