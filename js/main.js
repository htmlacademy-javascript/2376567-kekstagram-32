// import { createContent } from './data.js';
import { picturesApped } from './preview.js';
import { loadModal } from './modal.js';
import { loadForm } from './form.js';
import { getData } from './get-data.js';
// import './post-data.js';

// const data = createContent(1,25);

const data = await getData();

picturesApped(data);
loadModal(data);
loadForm();

