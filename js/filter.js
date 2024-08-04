import { returnRandomElem } from './util.js';
import { picturesApped } from './preview.js';
import { loadModal } from './modal.js';
import { debounce } from './util.js';

const QUANITY_PICTURES = 10;

const RERENDER_DELAY = 500;

const imgFilters = document.querySelector('.img-filters');

const getAllPictures = (pictures) => pictures;

const getRandomPictures = (pictures) => {
  const uniqueValues = new Set();
  pictures.forEach(() => {
    if (uniqueValues.size < QUANITY_PICTURES) {
      const randomValue = returnRandomElem(pictures);
      uniqueValues.add(randomValue);
    }
  });
  return Array.from(uniqueValues);
};

const getPopularPictures = (pictures) => pictures.slice().sort((previousElement,nextElement) => nextElement.comments.length - previousElement.comments.length);

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

const onImgFiltersClick = (data) => {
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
  imgFilters.addEventListener('click', onImgFiltersClick(data));
};

const loadFilter = (data) => {
  imgFilters.classList.remove('img-filters--inactive');
  picturesApped(getAllPictures(data));
  loadModal(data);
  addListener(data);
};

export { loadFilter, getFilteredData };
