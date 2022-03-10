
const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');

const toggleVisible = () => {
  bigPicture.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};

const renderFull = (data) => {
  pictures.addEventListener('click', (evt) => {
    if (evt.target.nodeName === 'IMG') {
      const clickedPost = data.filter((post) => post.id === Number(evt.target.dataset.photoId))[0];

      bigPicture.querySelector('.big-picture__img').querySelector('img').src = clickedPost.url;
      bigPicture.querySelector('.likes-count').textContent = clickedPost.likes;
      bigPicture.querySelector('.comments-count').textContent = clickedPost.comments.length;
      bigPicture.querySelector('.social__caption').textContent = clickedPost.description;

      const commentsElement = bigPicture.querySelector('.social__comments');
      commentsElement.innerHTML = '';
      clickedPost.comments.forEach((comment) => {
        const htmlContent = `
            <li class="social__comment">
                <img
                    class="social__picture"
                    src="${comment.avatar}"
                    alt="${comment.name}"
                    width="35" height="35">
                <p class="social__text">${comment.message}</p>
            </li>
        `;
        commentsElement.innerHTML += htmlContent;
      });

      toggleVisible();

      bigPicture.querySelector('.social__comment-count').classList.add('hidden');
      bigPicture.querySelector('.comments-loader').classList.add('hidden');
    }
  });
};

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    toggleVisible();
  }
});

bigPicture.querySelector('#picture-cancel').addEventListener('click', () => {
  toggleVisible();
});

export { renderFull };
