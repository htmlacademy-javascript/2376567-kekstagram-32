import { picturesApped } from './preview.js';
import { loadModal } from './modal.js';
import { loadForm } from './form.js';
import { getData } from './api.js';
// import './filter.js';

const onErrorGet = () => {
  const body = document.querySelector('body');
  const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorBlock = dataErrorTemplate.cloneNode(true);
  body.insertAdjacentElement('beforeBegin', errorBlock);
  setTimeout(() => errorBlock.remove(), 5000);
}

try {
  const data = await getData();
  picturesApped(data);
  loadModal(data);
  // loadFilter();
} catch (error) {
  console.error(error);
  onErrorGet();
}

loadForm();
