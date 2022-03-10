import { generatePosts } from './data.js';
import { renderThumb } from './render-thumb.js';

const fakeData = generatePosts(25);
renderThumb(fakeData);
