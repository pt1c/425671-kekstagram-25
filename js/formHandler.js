import { isEscapeKey, stopEscapePropagation } from './util.js';


const uploadControl = document.querySelector('#upload-file');
const uploadModal = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('#upload-select-image');
const closeModalButton = document.querySelector('#upload-cancel');

const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');


const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
};

closeModalButton.addEventListener('click', () => {
  closeUploadModal();
});

function closeUploadModal() {
  uploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  uploadForm.reset();
}

function openUploadModal() {
  uploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
}

uploadControl.addEventListener('change', () => {
  openUploadModal(uploadModal);
});

textHashtags.addEventListener('keydown', stopEscapePropagation);
textDescription.addEventListener('keydown', stopEscapePropagation);
