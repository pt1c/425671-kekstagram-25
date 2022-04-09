import { ALOWED_FILETYPES } from './const.js';
import { isEscapeKey, stopEscapePropagation } from './util.js';
import { effectsHandler, resetSlider, effectsList } from './image-effects.js';
import { scaleHandler, resetScaler } from './image-scale.js';
import { validateForm } from './validation.js';
import { sendData } from './data-fetch.js';
import { showSendSuccess, showSendError } from './modal-messages.js';

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

const imageUploadSubmit = document.querySelector('.img-upload__submit');
const disableSubmitButton = () => { imageUploadSubmit.disabled = true; };
const enableSubmitButton = () => { imageUploadSubmit.disabled = false; };

closeModalButton.addEventListener('click', closeUploadModal);

function closeUploadModal() {
  uploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  effectsList.removeEventListener('change', effectsHandler);
  imageUploadScale.removeEventListener('click', scaleHandler);
  resetUploadForm();
}

function openUploadModal() {
  uploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
  effectsList.addEventListener('change', effectsHandler);
  imageUploadScale.addEventListener('click', scaleHandler);
  uploadForm.addEventListener('submit', submitFormHandler);
}

function resetUploadForm(){
  uploadForm.reset();
  resetSlider();
  resetScaler();
  uploadControl.value = '';
}
resetUploadForm();

uploadControl.addEventListener('change', () => {
  changeUploadedImage();
});

textHashtags.addEventListener('keydown', stopEscapePropagation);
textDescription.addEventListener('keydown', stopEscapePropagation);

/* подстановка изображения */
function changeUploadedImage() {
  const imageFile = uploadControl.files[0];
  const fileExtension = imageFile.name.split('.').pop().toLowerCase();

  if (ALOWED_FILETYPES.includes(fileExtension)){
    const  fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.addEventListener('load', () => {
      document.querySelector('.img-upload__preview img').src = fileReader.result;
    });

    openUploadModal();
  }
}

/* хендлер для "отправить" */
function submitFormHandler(evt) {
  evt.preventDefault();
  if(validateForm()){
    disableSubmitButton();
    sendData(
      () => {
        showSendSuccess();
        closeUploadModal();
        enableSubmitButton();
      },
      () => {
        showSendError();
        closeUploadModal();
        enableSubmitButton();
      },
      new FormData(evt.target),
    );
  }
}
