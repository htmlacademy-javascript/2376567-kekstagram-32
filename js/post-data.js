import { closeImgRedactor } from './edit-picture.js';
import { closeModalForm } from './form.js';
import { loadMessage } from './form.js';

async function sendData(data) {
  let isResponse = false;
  try {
    const response = await fetch('https://32.javascript.htmlacademy.pro/kekstagram', {
      method: 'POST',
      body: data,
    });
    if (response.ok) {
      isResponse = true;
      closeModalForm();
      closeImgRedactor();
      loadMessage(isResponse);
    }
  } catch (error) {
    loadMessage(isResponse);
    console.error(error.message);
  }
}

export { sendData };
