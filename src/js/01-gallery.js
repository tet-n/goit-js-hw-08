import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

//REFERENCES
const galleryContainerRef = document.querySelector('.gallery');

//Creating markup
galleryContainerRef.insertAdjacentHTML(
  'afterbegin',
  creatingMarkup(galleryItems)
);

function creatingMarkup(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `<a href="${original}" class="gallery__link">
  <img class="gallery__image" src="${preview}" alt="${description}"/></a>`;
    })
    .join('');
}

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoomFactor: 0.1,
});
