function showList() {
  listBtn.classList.add('active');
  gridBtn.classList.remove('active');

  gallery.classList.add('list');
  gallery.classList.remove('grid');
}

function showGrid() {
  gridBtn.classList.add('active');
  listBtn.classList.remove('active');

  gallery.classList.add('grid');
  gallery.classList.remove('list');
}

function renderModal(image) {
  return `
    <i id="close-btn" class="fa-solid fa-xmark"></i>
    <div class="author-wrapper author-modal">
      <a href="${image.user.links.html}">
              <img class="profile-pic-small" src="${
                image.user.profile_image.small
              }" alt="">
      </a>
      <div id="about-me">
        <a href="${image.user.links.html}">
                <p style="color: black;" class="img-author">${
                  image.user.first_name
                } ${image.user.last_name}</p>
        </a>
        <a href="${image.user.portfolio_url}" target="_blank">
          <p>Portfolio</p>
        </a>
      </div>
    </div>
    <div class="modal-image-wrapper">
    <a href="${image.urls.regular}" target="_blank">
      <img class="large-img" src="${image.urls.regular}" alt="${
    image.alt_description ? image.alt_description : defaultAltDescription
  }" title="${
    image.alt_description ? image.alt_description : defaultAltDescription
  }">
    </a>
    </div>
    <div class="stats">
      <div class="likes">
        <p>Likes</p>
        <p>${image.user.total_likes}</p>
      </div>
      <div class="downloads">
        <p>Downloads</p>
        <p>${image.downloads}</p>
      </div>
      <div class="social-media">
        <span>Follow</span>
        <span>
          ${
            image.user.social.instagram_username
              ? `<a href="https://www.instagram.com/${image.user.social.instagram_username}"><i class="fa-brands fa-instagram"></i></a>`
              : ''
          }
        </span>
        <span>
          ${
            image.user.social.twitter_username
              ? `<a href="https://www.instagram.com/${image.user.social.twitter_username}"><i class="fa-brands fa-twitter"></i></a>`
              : ''
          }
        </span>
        <span>
          ${
            image.user.social.paypal_email
              ? `<a href="https://www.paypal.com${image.user.social.paypal_email}"><i class="fa-brands fa-paypal"></i></a>`
              : ''
          }
        </span>
      </div>
    </div>
  `;
}

function displayModal(image) {
  const imageModalContainer = document.querySelector('.image-modal');
  imageModalContainer.classList.remove('hide');

  imageModalContainer.innerHTML = renderModal(image);

  let closeModalBtn = document.getElementById('close-btn');
  closeModalBtn.addEventListener('click', () => {
    imageModalContainer.classList.add('hide');
  });
}

function displayImages(data) {
  data.forEach(image => {
    let imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');
    imgContainer.id = `img-${imgCounter}`;

    imgContainer.innerHTML = `
    <img src="${image.urls.small}" alt="${
      image.alt_description ? image.alt_description : defaultAltDescription
    }" class="image">
    <div id="img-${i}" class="overlay">
    <i class="fa-solid fa-expand"></i>
    <a href="${image.user.links.html}" class="author-wrapper">
    <img class="profile-pic-small" src="${
      image.user.profile_image.small
    }" alt="">
    <p class="img-author">by ${image.user.first_name} ${
      image.user.last_name
    }</p>
    </a>
    </div>
    `;

    gallery.append(imgContainer);
    imgCounter++;

    let currentImage = document.getElementById(`img-${imgCounter}`);
    currentImage.addEventListener('click', () => {
      displayModal(image);
    });
  });
  loader.classList.add('hide');
}

function getImages() {
  loader.classList.remove('hide');
  fetch(photosUrl)
    .then(response => response.json())
    .then(data => {
      allImagesArray = data;
      displayImages(allImagesArray);
    });
}

function infiniteScroll() {
  const endOfPage =
    window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

  if (endOfPage) {
    getImages();
  }
}
