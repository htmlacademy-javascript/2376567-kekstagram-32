import { returnRandomElem } from './util.js';
import { picturesApped } from './preview.js';
import { loadModal } from './modal.js';
import { debounce } from './util.js';

const QUANITY_PICTURES = 10;

const RERENDER_DELAY = 500;

const getAllPictures = (arr) => arr;

const getRandomPictures = (arr) => {
  const uniqueValues = new Set();
  arr.forEach(() => {
    if (uniqueValues.size < QUANITY_PICTURES) {
      const randomValue = returnRandomElem(arr);
      uniqueValues.add(randomValue);
    }
  });
  return Array.from(uniqueValues);
};

const getPopularPictures = (arr) => arr.slice().sort((a,b) => b.comments.length - a.comments.length);

const getFilteredData = (data,button) => {
  if (button.id === 'filter-default') {
    return getAllPictures(data);
  }
  if (button.id === 'filter-random') {
    return getRandomPictures(data);
  }
  if (button.id === 'filter-discussed') {
    return getPopularPictures(data);
  }
};

const setActiveFilterButton = (activeButton) => {
  const buttons = document.querySelectorAll('.img-filters__button');
  buttons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  activeButton.classList.add('img-filters__button--active');
};

const onImgFilter = (data) => {
  const debouncedFunction = debounce((button) => {
    const filteredData = getFilteredData(data, button);
    picturesApped(filteredData);
    loadModal(filteredData);
  }, RERENDER_DELAY);

  return (evt) => {
    const filterButton = evt.target.closest('button.img-filters__button');
    if (filterButton) {
      setActiveFilterButton(filterButton);
      debouncedFunction(filterButton);
    }
  };
};

const addListener = (data) => {
  const imgFilters = document.querySelector('.img-filters');
  imgFilters.addEventListener('click', onImgFilter(data));
};

const loadFilter = (data) => {
  const filter = document.querySelector('.img-filters');
  filter.classList.remove('img-filters--inactive');
  picturesApped(getAllPictures(data));
  loadModal(data);
  addListener(data);
};

export { loadFilter, getFilteredData };
