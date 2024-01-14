const accessKey = 'znpu7d5br1bq6CBIF-U_Cs1j8wiVicLx51_41XCWIW8';

const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const moreButton = document.getElementById('more-button');

let keyword = '';
let page = 1;

const searchImages = async function () {
  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos/?page=${page}&query=${keyword}&per_page=12&client_id=${accessKey}`;

  const res = await fetch(url);
  const data = await res.json();
  console.log(data);

  if (page === 1) {
    searchResult.innerHTML = '';
  }

  const results = data.results;

  results.map(el => {
    const image = document.createElement('img');
    image.src = el.urls.regular;
    const imageLink = document.createElement('a');
    imageLink.href = el.links.html;

    //opening the link in new tab
    imageLink.target = '_blank';

    //displaying the link in the image
    imageLink.appendChild(image);

    searchResult.appendChild(imageLink);
  });

  moreButton.style.display = 'block';
};

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  page = 1;
  searchImages();
});

moreButton.addEventListener('click', () => {
  page++;
  searchImages();
});
