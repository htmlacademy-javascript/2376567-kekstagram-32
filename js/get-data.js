const body = document.querySelector('body');
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

async function getData() {
  try {
    const response = await fetch('https://32.javascript.htmlacademy.pro/kekstagram/data');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch {
    const errorBlock = dataErrorTemplate.cloneNode(true);
    body.insertAdjacentElement('beforeBegin', errorBlock);
    setTimeout(() => errorBlock.remove(), 5000);
  }
}

export { getData };
