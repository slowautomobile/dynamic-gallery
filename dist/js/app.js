const accessKey = 'sFkV2gLfNxq6x8aqTrIUwr501AtrAB5V8IQ5ACxIXZ4';
const photosUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=30`;
const gallery = document.querySelector('.gallery');

const loader = document.querySelector('.loader-overlay');

const listBtn = document.getElementById('listBtn');
const gridBtn = document.getElementById('gridBtn');

listBtn.addEventListener('click', showList);
gridBtn.addEventListener('click', showGrid);

let allImagesArray;
const defaultAltDescription = 'Image from Unsplash.com';
let imgCounter = 0;

getImages();

window.addEventListener('scroll', infiniteScroll);
