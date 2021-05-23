const apiUrl =
  "https://fridarognstad.one/projectexam/wordpress/wp-json/wp/v2/posts";
const indexApiResults = document.querySelector(".index-api-results");

async function fetchIndexApi() {
  try {
    const data = await fetch(
      apiUrl + `?page=${carouselIndex}&per_page=${perPageIndex}`
    );
    const json = await data.json();

    indexApiResults.innerHTML = "";

    createIndexHtml(json);
  } catch (error) {
    console.log(error);
  }
}

function createIndexHtml(json) {
  for (let i = 0; i < json.length; i++) {
    indexApiResults.innerHTML += `<div class="blog-results">
                                    <a href="blog-post.html?id=${json[i].id}">
                                    <img class="blog-image" src="${json[i].featured_image_src.full}">
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

let perPageIndex = 1;

function checkMediaQuery() {
  if (window.innerWidth > 768) {
    perPageIndex = 2;
  }

  if (window.innerWidth > 991) {
    perPageIndex = 3;
  }
}

// Initial check
checkMediaQuery();

// Add a listener for when the window resizes
window.addEventListener(`resize`, checkMediaQuery);

fetchIndexApi(apiUrl);
