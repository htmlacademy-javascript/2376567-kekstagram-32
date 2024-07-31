import { loadForm } from './form.js';
import { getData } from './api.js';
import { loadFilter} from './filter.js';

const onErrorGet = () => {
  const body = document.querySelector('body');
  const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorBlock = dataErrorTemplate.cloneNode(true);
  body.insertAdjacentElement('beforeBegin', errorBlock);
  setTimeout(() => errorBlock.remove(), 5000);
};

loadForm();

try {
  const data = await getData();
  console.log(data);
  loadFilter(data);
} catch (error) {
  console.error(error);
  onErrorGet();
}
