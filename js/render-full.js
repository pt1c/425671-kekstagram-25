
const picture = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');

const toggleVisible = () => {
  bigPicture.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};

const handleEscape = (evt) => {
  if (evt.key === 'Escape') {
    toggleVisible('close');
  }
};

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
    if (evt.target.classList.contains('picture__img')) {
      const clickedPost = data.find((post) => post.id === Number(evt.target.dataset.photoId));

      bigPicture.querySelector('.big-picture__img').querySelector('img').src = clickedPost.url;
      bigPicture.querySelector('.likes-count').textContent = clickedPost.likes;
      bigPicture.querySelector('.comments-count').textContent = clickedPost.comments.length;
      bigPicture.querySelector('.social__caption').textContent = clickedPost.description;

      renderComments(clickedPost.comments);

      toggleVisible();
      document.addEventListener('keydown', handleEscape, { once: true });

      bigPicture.querySelector('.social__comment-count').classList.add('hidden');
      bigPicture.querySelector('.comments-loader').classList.add('hidden');
    }
  });
};

bigPicture.querySelector('#picture-cancel').addEventListener('click', () => {
  toggleVisible();
});

export { renderFull };
