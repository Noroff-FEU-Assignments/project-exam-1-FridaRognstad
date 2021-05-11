const blogContainer = document.querySelector(".blog-container");
const url =
  "https://fridarognstad.one/projectexam/wordpress/wp-json/wp/v2/posts?per_page=50";
const olderPostsButton = document.querySelector("#older-posts");

async function fetchBlogPosts() {
  try {
    const response = await fetch(url);
    const blogPosts = await response.json();

    console.log(blogPosts);

    blogContainer.innerHTML = "";

    for (let i = 0; i < 9; i++) {
      blogContainer.innerHTML += `<div class="blog-results">
      <a href="blog-post.html?id=${blogPosts[i].id}">
      <img class="blog-image" src="${blogPosts[i].featured_image_src.full}">
      <p class="date">${blogPosts[i].published_on}</p>
      <h2>${blogPosts[i].title.rendered}</h2>
      </a>
      </div>
       `;
    }
  } catch (error) {
    console.log("Could not call the API");
  }
}

olderPostsButton.addEventListener("click", () => {
  async function fetchBlogPosts(url) {
    try {
      const response = await fetch(url);
      const blogPosts = await response.json();

      blogContainer.innerHTML = "";
      olderPostsButton.style.display = "none";

      for (let i = 0; i < 18; i++) {
        blogContainer.innerHTML += `<div class="blog-results">
                                    <a href="blog-post.html?id=${blogPosts[i].id}">
                                    <img class="blog-image" src="${blogPosts[i].featured_image_src.full}">
                                    <p class="date">${blogPosts[i].published_on}</p>
                                    <h2>${blogPosts[i].title.rendered}</h2>
                                    </a></div>
                                     `;
      }
    } catch (error) {
      console.log("api error");
    }
  }
  fetchBlogPosts(url);
});

fetchBlogPosts(url);
