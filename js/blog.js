const blogContainer = document.querySelector(".blog-container");
const indexBlogContainer = document.querySelector(".latest-posts-container");
const url = "https://fridarognstad.one/projectexam/wordpress/wp-json/wp/v2";

async function fetchBlogPosts() {
  try {
    const response = await fetch(url);
    const blogPosts = await response.json();

    console.log(blogPosts);

    blogContainer.innerHTML = "";

    createHtml(blogPosts);
  } catch (error) {
    console.log("Could not call the API");
  }
}

function createHtml(blogPosts) {
  for (let i = 0; i < blogPosts.length; i++) {
    blogContainer.innerHTML += `<div class="blog-results">
                                  <img class="blog-image" src="${blogPosts[i].featured_image_src.full}">
                                  <p class="date">${blogPosts[i].published_on}</p>
                                  <h2>${blogPosts[i].title.rendered}</h2>
                                  </div>
                                   `;
  }
}

fetchBlogPosts();
