import { generatePosts } from './data.js';
import { renderThumb } from './render-thumb.js';
import { renderFull } from './render-full.js';

const FAKE_POSTS = 25;

const fakeData = generatePosts(FAKE_POSTS);
renderThumb(fakeData);
renderFull(fakeData);
