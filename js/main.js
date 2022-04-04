import { fetchData } from './data-fetch.js';
import { renderFull } from './render-full.js';
import { showFetchError } from './modal-messages.js';
import './image-upload-modal.js';
import { renderFilteredThumbs } from './filter.js';


fetchData((data) => {
  renderFilteredThumbs(data);
  renderFull(data);
}, (error) => showFetchError(error));
