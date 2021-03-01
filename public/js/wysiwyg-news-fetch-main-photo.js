const newsId = document.getElementById('news-id');
const mainPhotoForm = document.getElementById('main-photo-form');
const mainPhotoFiles = document.getElementById('main-photo-files');
const mainPhotoBrowseBtn = document.getElementById('browse-main-photo');
const mainPhotoSubmitBtn = document.getElementById('submit-main-photo');
const mainPhotoCurrentContainer = document.getElementById('main-photo-current-container');
const mainPhotoCurrentImg = document.getElementById('main-photo-current');
const mainPhotoCurrentDeleteForm = document.getElementById('main-photo-current-delete');

document.body.onload = () => {
  const src = mainPhotoCurrentImg.getAttribute('src');
  if (src) {
    mainPhotoCurrentContainer.style.display = 'block';
    mainPhotoBrowseBtn.disabled = true;
  }
};

mainPhotoBrowseBtn.onclick = () => mainPhotoFiles.click();

mainPhotoFiles.oninput = () => {
  mainPhotoSubmitBtn.disabled = false;
  mainPhotoBrowseBtn.disabled = true;
};

mainPhotoForm.onsubmit = async (event) => {
  event.preventDefault();
  mainPhotoSubmitBtn.disabled = true;

  const formData = new FormData(mainPhotoForm);
  formData.set('contentId', newsId.value);
  formData.set('contentType', 'news');

  const response = await fetch('/upload/main-photo', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const { filename, contentId: id } = await response.json();

    if (filename) {
      mainPhotoBrowseBtn.disabled = true;
      mainPhotoFiles.value = null;
      mainPhotoCurrentContainer.style.display = 'block';
      mainPhotoCurrentImg.src = `/icon/${filename}?height=200&width=300`;
    }

    if (id) {
      newsId.value = id;
    }
  } else {
    switch (response.status) {
      case 413:
        alert('Файл не завантажено. Максималький розмір 5МБ!');
        mainPhotoSubmitBtn.disabled = true;
        mainPhotoBrowseBtn.disabled = false;
        mainPhotoFiles.value = '';
        break;
      default:
        break;
    }
  }
};

mainPhotoCurrentDeleteForm.onsubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData(mainPhotoCurrentDeleteForm);
  formData.set('contentId', newsId.value);
  formData.set('contentType', 'news');

  const response = await fetch('/delete/main-photo', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    mainPhotoBrowseBtn.disabled = false;
    mainPhotoCurrentContainer.style.display = 'none';
    mainPhotoCurrentImg.src = '';
  }
};
