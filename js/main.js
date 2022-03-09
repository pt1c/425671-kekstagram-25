import { generatePosts } from './data.js';
import { renderThumb } from './renderThumb.js';

const fakeData = generatePosts(25);
renderThumb(fakeData);
