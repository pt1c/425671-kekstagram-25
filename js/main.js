import { FAKE_POSTS } from './const.js';
import { generatePosts } from './data.js';
import { renderThumb } from './render-thumb.js';
import { renderFull } from './render-full.js';
import './image-upload-modal.js';
import './validation.js'; // based on Pristine

const fakeData = generatePosts(FAKE_POSTS);
renderThumb(fakeData);
renderFull(fakeData);
