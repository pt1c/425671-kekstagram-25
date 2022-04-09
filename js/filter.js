import { FILTERED_THUMBS } from './const.js';
import { debounce, shuffle } from './util.js';
import { renderThumbs } from './render-thumb.js';

const filtersElement = document.querySelector('.img-filters');


const removePictures = () => {
  const pictures = document.querySelectorAll('.picture');
  if (pictures) {
    pictures.forEach((element) => {
      element.remove();
    });
  }
};

const filters = {
  'filter-default': (data) => (data.slice()),
  'filter-random': (data) => (shuffle(data.slice()).slice(0, FILTERED_THUMBS)),
  'filter-discussed': (data) => (data.slice().sort((pictureA, pictureB) => (pictureB.comments.length - pictureA.comments.length)))
};

const renderFilteredThumbs = (data) => {

  const filtersHandler = (evt) => {
    if (evt.target.tagName !== 'BUTTON') {
      return;
    }

    const activeButton = document.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');

    removePictures();
    renderThumbs(filters[evt.target.id](data));
  };

  filtersElement.addEventListener('click', debounce(filtersHandler));
  filtersElement.classList.remove('img-filters--inactive');

  renderThumbs(data);
};

export { renderFilteredThumbs };
