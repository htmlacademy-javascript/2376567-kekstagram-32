const DATA_PATH = 'https://32.javascript.htmlacademy.pro/kekstagram';
const GET_ROUTE = '/data';
const POST_ROUTE = '/';


const load = async (path, route, method, body = null) => {
  try {
    const response = await fetch(path + route, {
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

const postData = (body) => load(DATA_PATH, POST_ROUTE, 'POST', body);
const getData = () => {
  const data = load(DATA_PATH, GET_ROUTE, 'GET');
  return data;
};

export { postData, getData };
