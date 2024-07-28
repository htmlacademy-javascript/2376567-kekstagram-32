const uploadFile = document.querySelector('#upload-file');
const previewPicture = document.querySelector('.img-upload__preview>img');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const imgLoader = () => {
  uploadFile.addEventListener('change', () => {
    const file = uploadFile.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      previewPicture.src = URL.createObjectURL(file);
    }
  });
};

export { imgLoader };
