const searchBar = document.querySelector("#searchbar");
const searchResults = document.querySelector(".search-results");

const loadPosts = async () => {
  try {
    const res = await fetch(
      "https://fridarognstad.one/projectexam/wordpress/wp-json/wp/v2/posts?per_page=100"
    );
    searchBlogPosts = await res.json();
  } catch (error) {
    console.log("Could not call the API");
    blogContainer.innerHTML = message(
      "Sorry, something went wrong loading the posts :("
    );
  }
};

const displayPosts = (posts) => {
  const htmlString = posts
    .map((post) => {
      return `
            <li class="search-result-li">
            <a href="blog-post.html?id=${post.id}">
                <img src="${post.featured_image_src.full}" alt="${post.title.rendered}"></img>
                <div class="search-result-text">
                <p> ${post.published_on}</p>
                <h2>${post.title.rendered}</h2>
                </div>
            </a>
            </li>
        `;
    })
    .join("");
  searchResults.innerHTML = htmlString;
};

let searchBlogPosts = [];

searchBar.addEventListener("keyup", (a) => {
  const searchTyped = a.target.value.toLowerCase();
  console.log(searchTyped);
  const filteredPosts = searchBlogPosts.filter((post) => {
    return (
      post.title.rendered.toLowerCase().includes(searchTyped) ||
      post.content.rendered.toLowerCase().includes(searchTyped) ||
      post.published_on.includes(searchTyped)
    );
  });
  displayPosts(filteredPosts);
});

loadPosts();
