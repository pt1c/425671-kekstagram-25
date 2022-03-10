
const renderThumb = (data) => {
  const templateData = document.querySelector('#picture').content;
  const pictures = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  data.forEach((post) => {
    const element = templateData.cloneNode(true);

    const picture = element.querySelector('.picture__img');
    picture.src = post.url;
    picture.dataset.photoId = post.id;

    const likes = element.querySelector('.picture__likes');
    likes.textContent = post.likes;

    const comments = element.querySelector('.picture__comments');
    comments.textContent = post.comments.length;

    fragment.appendChild(element);
  });

  pictures.appendChild(fragment);
};

export { renderThumb };
