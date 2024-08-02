import { loadForm } from './form.js';
import { getData } from './api.js';
import { loadFilter} from './filter.js';

const ERROR_SHOWN_TIME = 5000;

const onErrorGet = () => {
  const body = document.querySelector('body');
  const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorBlock = dataErrorTemplate.cloneNode(true);
  body.insertAdjacentElement('beforeBegin', errorBlock);
  setTimeout(() => errorBlock.remove(), ERROR_SHOWN_TIME);
};

loadForm();

try {
  const data = await getData();
  loadFilter(data);
} catch (error) {
  onErrorGet();
}
