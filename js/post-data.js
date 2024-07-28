import { closeImgRedactor } from './edit-picture.js';
import { closeModalForm } from './form.js';
import { loadMessage } from './form.js';

async function sendData(data) {
  try {
    const response = await fetch('https://32.javascript.htmlacademy.pro/kekstagram', {
      method: 'POST',
      body: data,
    });
    if (response.ok) {
      closeModalForm();
      closeImgRedactor();
      loadMessage(true);
    }
  } catch (error) {
    loadMessage(false);
    console.error(error.message);
  }
}

export { sendData };
