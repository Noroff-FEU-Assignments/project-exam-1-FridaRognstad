const searchBar = document.querySelector("#searchbar");
const searchResults = document.querySelector(".search-results");

async function loadPosts() {
  try {
    const response = await fetch(
      "https://fridarognstad.one/projectexam/wordpress/wp-json/wp/v2/posts?per_page=100"
    );
    searchBlogPosts = await response.json();
  } catch (error) {
    console.log("Could not call the API");
    blogContainer.innerHTML = message(
      "Sorry, something went wrong loading the posts :("
    );
  }
}

function displayPosts(posts) {
  const searchHtml = posts.map((post) => {
    return `<li class="search-result-li">
            <a href="blog-post.html?id=${post.id}">
            <img src="${post.featured_image_src.full}" alt="${post.title.rendered}"></img>
            <div class="search-result-text">
            <p> ${post.published_on}</p>
            <h2>${post.title.rendered}</h2>
            </div>
            </a>
            </li>`;
  });
  searchResults.innerHTML = searchHtml;
}

let searchBlogPosts = [];

searchBar.addEventListener("keyup", (letters) => {
  const lettersTyped = letters.target.value.toLowerCase();

  const filteredPosts = searchBlogPosts.filter((post) => {
    return (
      post.title.rendered.toLowerCase().includes(lettersTyped) ||
      post.content.rendered.toLowerCase().includes(lettersTyped) ||
      post.published_on.includes(lettersTyped)
    );
  });
  displayPosts(filteredPosts);
});

loadPosts();
