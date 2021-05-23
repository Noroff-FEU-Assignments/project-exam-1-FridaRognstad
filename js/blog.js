const blogContainer = document.querySelector(".blog-container");
let url = "https://fridarognstad.one/projectexam/wordpress/wp-json/wp/v2/posts";
const olderPostsButton = document.querySelector("#older-posts");
let pageIndex = 9;

async function fetchBlogPosts() {
  try {
    const response = await fetch(url + `?per_page=${pageIndex}`);
    const blogPosts = await response.json();

    console.log(blogPosts);

    blogContainer.innerHTML = "";

    createBlogHtml(blogPosts);
  } catch (error) {
    console.log("Could not call the API");
  }
}

function loadMore() {
  pageIndex * 2;
  if (pageIndex === 9) {
    pageIndex = 18;
  } else if (pageIndex === 18) {
    pageIndex = 27;
    olderPostsButton.style.display = "none";
  }
  fetchBlogPosts();
}

olderPostsButton.addEventListener("click", loadMore);

function createBlogHtml(blogPosts) {
  for (let i = 0; i < blogPosts.length; i++) {
    blogContainer.innerHTML += `<div class="blog-results">
        <a href="blog-post.html?id=${blogPosts[i].id}">
        <img class="blog-image" src="${blogPosts[i].featured_image_src.full}">
        <p class="date">${blogPosts[i].published_on}</p>
        <h2>${blogPosts[i].title.rendered}</h2>
        </a>
        </div>
         `;
  }
}

fetchBlogPosts(url);
