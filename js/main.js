import { fetchData } from './data-fetch.js';
import { renderThumb } from './render-thumb.js';
import { renderFull } from './render-full.js';
import { showFetchError } from './modal-messages.js';
import './image-upload-modal.js';


fetchData((data) => {
  renderThumb(data);
  renderFull(data);
}, (error) => showFetchError(error));
