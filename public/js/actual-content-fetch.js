// const linkImgForm = document.getElementById('send-link-img-form');
// const browseButton = document.getElementById('actual-content-browse-img-btn');
// const submitButton = document.getElementById('actual-content-submit-img-btn');
// const fileInput = document.getElementById('actual-content-img-input');
// const imgDeleteButton = document.getElementById('delete-actual-content-img');
// const currentImage = document.getElementById('actual-content-image');
// const currentImgBlock = document.getElementById('current-actual-content-img');
// const actualContentIdInput = document.getElementById('actual-content-id');

const actualContentId = document.getElementById('actual-content-id');
const actualContentImgFile = document.getElementById('actual-content-img-input');
const actualContentImgForm = document.getElementById('actual-content-img-form');
const actualContentImgBrowseBtn = document.getElementById('browse-actual-content-img-btn');
const actualContentImgSubmitBtn = document.getElementById('submit-actual-content-img-btn');
const actualContentCurrentImgContainer = document.getElementById('current-actual-content-img-block');
const actualContentCurrentImg = document.getElementById('actual-content-image');
const actualContentCurrentImgDeleteForm = document.getElementById('actual-content-img-delete-form');

document.body.onload = () => {
  const src = actualContentCurrentImg.getAttribute('src');
  if (src) {
    actualContentCurrentImgContainer.style.display = 'block';
    actualContentImgBrowseBtn.disabled = true;
  }
};

actualContentImgBrowseBtn.onclick = () => actualContentImgFile.click();

actualContentImgFile.oninput = () => {
  actualContentImgSubmitBtn.disabled = false;
  actualContentImgBrowseBtn.disabled = true;
};

actualContentImgForm.onsubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData(actualContentImgForm);
  formData.set('actualContentId', actualContentId.value);

  const response = await fetch('/upload/actual-content-img', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const { filename, actualContentId: id } = await response.json();

    if (filename) {
      actualContentImgSubmitBtn.disabled = true;
      actualContentImgBrowseBtn.disabled = true;
      actualContentImgFile.value = null;
      actualContentCurrentImgContainer.style.display = 'block';
      actualContentCurrentImg.src = `/image/${filename}?height=200&width=300`;
    }

    if (id) {
      actualContentId.value = id;
    }
  }
};

actualContentCurrentImgDeleteForm.onsubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData(actualContentCurrentImgDeleteForm);
  formData.set('actualContentId', actualContentId.value);

  const response = await fetch('/delete/actual-content-img', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    actualContentImgBrowseBtn.disabled = false;
    actualContentCurrentImgContainer.style.display = 'none';
    actualContentCurrentImg.src = '';
  }
};
