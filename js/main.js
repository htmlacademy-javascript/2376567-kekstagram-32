import { createContent } from './data.js';
import { picturesApped } from './preview.js';
import { loadModal } from './modal.js';
import { loadForm } from './form.js';
import { loadValidation } from './validation.js';

const data = createContent(1,25);

picturesApped(data);
loadModal(data);
loadForm();
loadValidation();

