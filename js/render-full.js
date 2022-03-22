import { isEscapeKey } from './util.js';


const picture = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('#picture-cancel');

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
}

function openModal() {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
}

const renderComments = (comments) => {
  const commentsElement = bigPicture.querySelector('.social__comments');

  commentsElement.innerHTML = '';
  comments.forEach((comment) => {
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

    commentsElement.append(commentListItem);
  });
};

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

    renderComments(clickedPost.comments);

    openModal();

    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');

  });
};

export { renderFull };
