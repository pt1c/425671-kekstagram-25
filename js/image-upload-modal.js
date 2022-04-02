import { isEscapeKey, stopEscapePropagation } from './util.js';
import { effectsHandler, resetSlider, effectsList } from './image-effects.js';
import { scaleHandler, resetScaler } from './image-scale.js';


const uploadControl = document.querySelector('#upload-file');
const uploadModal = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('#upload-select-image');
const closeModalButton = document.querySelector('#upload-cancel');
const imageUploadScale = document.querySelector('.img-upload__scale');

const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');


const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
};

closeModalButton.addEventListener('click', closeUploadModal);

function closeUploadModal() {
  uploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);

  uploadForm.reset(); //cкидывает поля формы
  effectsList.removeEventListener('change', effectsHandler); //эффекты из effects.js
  imageUploadScale.removeEventListener('click', scaleHandler); //скейлер
}

function openUploadModal() {
  uploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);

  effectsList.addEventListener('change', effectsHandler); //эффекты из effects.js
  resetSlider(); //скидывает эффекты
  imageUploadScale.addEventListener('click', scaleHandler); //скейлер
  resetScaler(); //скидывает скейлер
}

uploadControl.addEventListener('change', () => {
  openUploadModal();
  changeUploadedImage();
});

textHashtags.addEventListener('keydown', stopEscapePropagation);
textDescription.addEventListener('keydown', stopEscapePropagation);

/* подстановка изображения */
function changeUploadedImage() {
  const imageFile = uploadControl.files[0];

  const  fileReader = new FileReader();
  fileReader.readAsDataURL(imageFile);
  fileReader.addEventListener('load', () => {
    document.querySelector('.img-upload__preview img').src = fileReader.result;
  });
}
