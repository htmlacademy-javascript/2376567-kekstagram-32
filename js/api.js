const DATA_PATH = 'https://32.javascript.htmlacademy.pro/kekstagram';
const GET_ROUTE = '/data';
const POST_ROUTE = '/';


const load = async (path, route, method, body = null) => {
  const response = await fetch(`${path}${route}`, {
    method: method,
    body: body
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw new Error(`Ошибка загрузки: ${response.status}`);
};

const postData = (body) => load(DATA_PATH, POST_ROUTE, 'POST', body);
const getData = async () => {
  const data = await load(DATA_PATH, GET_ROUTE, 'GET');
  return data;
};

export { postData, getData };
