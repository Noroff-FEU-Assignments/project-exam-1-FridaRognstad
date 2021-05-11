const apiUrl =
  "https://fridarognstad.one/projectexam/wordpress/wp-json/wp/v2/posts?per_page=6";
const indexApiResults = document.querySelector(".index-api-results");

async function fetchIndexApi(apiUrl) {
  try {
    const data = await fetch(apiUrl);
    const json = await data.json();

    indexApiResults.innerHTML = "";

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
  } catch (error) {
    console.log(error);
  }
}

const carouselSlider = document.querySelector(".carousel-slider");
const blogResults = document.querySelector(".blog-results");

const previousButton = document.querySelector(".left");
const nextButton = document.querySelector(".right");

let index = 0;

nextButton.addEventListener("click", function () {
  index = index < 3 ? index + 1 : 3;
  carouselSlider.style.transform = `translate(` + index * -16.8 + `%)`;
});

previousButton.addEventListener("click", function () {
  index = index > 0 ? index - 1 : 0;
  carouselSlider.style.transform = `translate(` + index * -16.8 + `%)`;
});

fetchIndexApi(apiUrl);
