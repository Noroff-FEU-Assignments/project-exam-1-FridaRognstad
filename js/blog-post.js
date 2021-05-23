const detailContainer = document.querySelector(".blog-post-container");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

console.log(id);

const url =
  "https://fridarognstad.one/projectexam/wordpress/wp-json/wp/v2/posts/" + id;

console.log(url);

async function fetchPost() {
  try {
    const response = await fetch(url);
    const details = await response.json();

    console.log(details);

    createDetailHtml(details);
  } catch (error) {
    console.log("Could not call the API");
  }
}

fetchPost();

function createDetailHtml(details) {
  detailContainer.innerHTML = `<div class="blog-details">
                                <div class="details-heading">
                                <h1>${details.title.rendered}</h1>
                                <p class="date">${details.published_on}</p>
                                </div>
                                <div class="details-content">
                                <img id="openModalImage" class="blog-image" src="${details.featured_image_src.full}">
                                <p>${details.content.rendered}</p>
                                </div>
                                </div>

                                <div class="modal">
                                <img class="modalImage" src="${details.featured_image_src.full}">
                                <div class="close">x</div>
                                </div>
                                 `;
  const modal = document.querySelector(".modal");

  // Get the image and insert it inside the modal - use its "alt" text as a caption
  const img = document.querySelector("#openModalImage");
  const modalImg = document.querySelector(".modalImage");
  img.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
  };

  // Get the <span> element that closes the modal
  const close = document.querySelector(".close");

  // When the user clicks on <span> (x), close the modal
  close.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

// Get the modal
