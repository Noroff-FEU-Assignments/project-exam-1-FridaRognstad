const apiUrl =
  "https://fridarognstad.one/projectexam/wordpress/wp-json/wp/v2/posts";
const indexApiResults = document.querySelector(".index-api-results");
const latestPostsSection = document.querySelector(".latest-posts");

//fetching blogposts to carousel
async function fetchIndexApi() {
  try {
    const data = await fetch(
      apiUrl + `?page=${carouselIndex}&per_page=${perPageIndex}&_embed`
    );
    const json = await data.json();

    indexApiResults.innerHTML = "";

    createIndexHtml(json);
  } catch (error) {
    console.log("Could not call the API");
    latestPostsSection.innerHTML = message(
      "Sorry, something went wrong loading the posts :("
    );
  }
}

//creating html to carousel
function createIndexHtml(json) {
  for (let i = 0; i < json.length; i++) {
    indexApiResults.innerHTML += `<div class="blog-results">
                                    <a href="blog-post.html?id=${json[i].id}">
                                    <img class="blog-image" alt="${json[i]._embedded["wp:featuredmedia"][0].alt_text}" src=${json[i]._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url}">
                                    <p class="date">${json[i].published_on}</p>
                                    <h3>${json[i].title.rendered}</h3>
                                    </a>
                                    </div>
                                     `;
  }
}

const previousButton = document.querySelector(".left");
const nextButton = document.querySelector(".right");
let carouselIndex = 1;

//arrows clickable and make the carousell endless
function next() {
  carouselIndex++;
  if (carouselIndex === 4) {
    carouselIndex = 1;
  }
  fetchIndexApi();
}
function previous() {
  carouselIndex--;
  if (carouselIndex === 0) {
    carouselIndex = 3;
  }
  fetchIndexApi();
}

previousButton.addEventListener("click", previous);
nextButton.addEventListener("click", next);

//adjust visable posts inside carousel considering screen-size
let perPageIndex = 1;

function checkMediaQuery() {
  if (window.innerWidth > 768) {
    perPageIndex = 2;
  }

  if (window.innerWidth > 991) {
    perPageIndex = 3;
  }
}

checkMediaQuery();

window.addEventListener(`resize`, checkMediaQuery);

// reload indexpage when resized to update carousel
let resizeReload;

window.addEventListener("resize", function () {
  clearTimeout(resizeReload);
  resizeReload = setTimeout(function () {
    window.location.reload();
  }, 1500);
});

fetchIndexApi(apiUrl);

