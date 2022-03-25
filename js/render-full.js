import { COMMENTS_PER_PAGE } from './const.js';
import { isEscapeKey } from './util.js';


const picture = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('#picture-cancel');
const commentsElement = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let commentsOpened = 0;
let postComments = [];

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

closeButton.addEventListener('click', closeModal);

function closeModal() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  commentsLoader.removeEventListener('click', commentsLoaderHandler);
  commentsOpened = 0;
}

function openModal() {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
  commentsLoader.addEventListener('click', commentsLoaderHandler);
}

const renderOneComment = (comment) => {
  const commentListItem = document.createElement('li');
  commentListItem.classList.add('social__comment');

  const commentImage = document.createElement('img');
  commentImage.classList.add('social__picture');
  commentImage.src = comment.avatar;
  commentImage.alt = comment.name;
  commentImage.width = 35;
  commentImage.height = 35;

  const commentMessage = document.createElement('p');
  commentMessage.classList.add('social__text');
  commentMessage.textContent = comment.message;

  commentListItem.append(commentImage);
  commentListItem.append(commentMessage);
  return commentListItem;
};

const renderCommentsBlock = () => {
  const commentsToOpen = postComments.slice(commentsOpened, commentsOpened + COMMENTS_PER_PAGE);

  commentsToOpen.forEach((comment) => {
    commentsElement.append(renderOneComment(comment));
  });
  commentsOpened += commentsToOpen.length;

  bigPicture.querySelector('.comments-opened').textContent = commentsOpened;

  if (commentsOpened >= postComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

function commentsLoaderHandler() {
  renderCommentsBlock();
}

const renderFull = (data) => {
  picture.addEventListener('click', (evt) => {
    if (evt.target.dataset.photoId === undefined) {
      return;
    }

    const clickedPost = data.find((post) => post.id === Number(evt.target.dataset.photoId));

    bigPicture.querySelector('.big-picture__img').querySelector('img').src = clickedPost.url;
    bigPicture.querySelector('.likes-count').textContent = clickedPost.likes;
    bigPicture.querySelector('.comments-count').textContent = clickedPost.comments.length;
    bigPicture.querySelector('.social__caption').textContent = clickedPost.description;

    commentsElement.innerHTML = '';
    postComments = clickedPost.comments;
    renderCommentsBlock();

    openModal();
  });
};

export { renderFull };
