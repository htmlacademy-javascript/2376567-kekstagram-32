const SEND_DATA_PATH = 'https://32.javascript.htmlacademy.pro/kekstagram';
const GET_DATA_PATH = 'https://32.javascript.htmlacademy.pro/kekstagram/data';

const load = async (path, method, body = null) => {
  try {
    const response = await fetch(path, {
      method: method,
      body: body
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error(`Ошибка загрузки: ${response.status}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const postData = (body) => load(SEND_DATA_PATH, 'POST', body);
const getData = () => {
  const data = load(GET_DATA_PATH, 'GET');
  return data;
};

export { postData, getData };
