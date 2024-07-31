const uploadFile = document.querySelector('#upload-file');
const previewPicture = document.querySelector('.img-upload__preview>img');
const effectsPreview = document.querySelectorAll('.effects__preview');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const imgLoader = () => {
  uploadFile.addEventListener('change', () => {
    const file = uploadFile.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const objectURL = URL.createObjectURL(file);
      previewPicture.src = objectURL;

      effectsPreview.forEach((effect) => {
        effect.style.backgroundImage = `url(${objectURL})`;
      });
    }
  });
};

export { imgLoader };
