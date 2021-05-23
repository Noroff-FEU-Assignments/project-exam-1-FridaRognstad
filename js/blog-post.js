const detailContainer = document.querySelector(".blog-post-container");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

console.log(id);

const url =
  "https://fridarognstad.one/projectexam/wordpress/wp-json/wp/v2/posts/" +
  id +
  `?_embed`;

console.log(url);

//fetching the blogpost
async function fetchPost() {
  try {
    const response = await fetch(url);
    const details = await response.json();

    console.log(details);

    createDetailHtml(details);
    createTitle(details);
  } catch (error) {
    console.log("Could not call the API");
    detailContainer.innerHTML = message(
      "Sorry, something went wrong loading the post :("
    );
  }
}

fetchPost();

//create blog-post html and image modal
function createDetailHtml(details) {
  detailContainer.innerHTML = `<div class="blog-details">
                                <div class="details-heading">
                                <h1>${details.title.rendered}</h1>
                                <p class="date">${details.published_on}</p>
                                </div>
                                <div class="details-content">
                                <img id="openModalImage" class="blogpost-image" alt="${details._embedded["wp:featuredmedia"][0].alt_text}" src="${details._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url}">
                                <div class="blogpost-content">${details.content.rendered}</div>
                                </div>
                                </div>
                                <div class="modal">
                                <img class="modalImage" src="${details.featured_image_src.full}">
                                <div class="close">&#215;</div>
                                </div>
                                 `;
  const modal = document.querySelector(".modal");

  const img = document.querySelector("#openModalImage");
  const modalImg = document.querySelector(".modalImage");
  img.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
  };

  const close = document.querySelector(".close");

  close.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

// Blog post title
const blogTitle = document.querySelector(".blog-post-title");

function createTitle(details) {
  blogTitle.innerHTML = `Sarah Oliver | ${details.title.rendered}`;
}
