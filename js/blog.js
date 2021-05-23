const blogContainer = document.querySelector(".blog-container");
let url =
  "https://fridarognstad.one/projectexam/wordpress/wp-json/wp/v2/posts?_embed";
const olderPostsButton = document.querySelector("#older-posts");
let pageIndex = 9;

// fetching blogposts
async function fetchBlogPosts() {
  try {
    const response = await fetch(url + `&per_page=${pageIndex}`);
    const blogPosts = await response.json();

    console.log(blogPosts);

    blogContainer.innerHTML = "";

    createBlogHtml(blogPosts);
  } catch (error) {
    console.log("Could not call the API");
    blogContainer.innerHTML = message(
      "Sorry, something went wrong loading the posts :("
    );
  }
}

//adding posts when olderposts are clicked and hiding link at the end
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

// create blogposts html
function createBlogHtml(blogPosts) {
  for (let i = 0; i < blogPosts.length; i++) {
    blogContainer.innerHTML += `<div class="blog-results">
        <a href="blog-post.html?id=${blogPosts[i].id}" tabindex="0">
        <img class="blog-image" alt="${blogPosts[i]._embedded["wp:featuredmedia"][0].alt_text}" src="${blogPosts[i]._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url}">
        <p class="date">${blogPosts[i].published_on}</p>
        <h2>${blogPosts[i].title.rendered}</h2>
        </a>
        </div>
         `;
  }
}

fetchBlogPosts(url);
