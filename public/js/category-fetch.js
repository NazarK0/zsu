const categoryId = document.getElementById('category-id');
const categoryImgFile = document.getElementById('category-img-input');
const categoryImgForm = document.getElementById('category-img-form');
const categoryImgBrowseBtn = document.getElementById('browse-category-img-btn');
const categoryImgSubmitBtn = document.getElementById('submit-category-img-btn');
const categoryCurrentImgContainer = document.getElementById('current-category-img-block');
const categoryCurrentImg = document.getElementById('category-image');
const categoryCurrentImgDeleteForm = document.getElementById('category-img-delete-form');

document.body.onload = () => {
  const src = categoryCurrentImg.getAttribute('src');
  if (src) {
    categoryCurrentImgContainer.style.display = 'block';
    categoryImgBrowseBtn.disabled = true;
  }
};

categoryImgBrowseBtn.onclick = () => categoryImgFile.click();

categoryImgFile.oninput = () => {
  categoryImgSubmitBtn.disabled = false;
  categoryImgBrowseBtn.disabled = true;
};

categoryImgForm.onsubmit = async (event) => {
  event.preventDefault();
  categoryImgSubmitBtn.disabled = true;

  const formData = new FormData(categoryImgForm);
  formData.set('categoryId', categoryId.value);

  const response = await fetch('/upload/category-photo', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const { filename, categoryId: id } = await response.json();

    if (filename) {
      categoryImgBrowseBtn.disabled = true;
      categoryImgFile.value = null;
      categoryCurrentImgContainer.style.display = 'block';
      categoryCurrentImg.src = `/icon/${filename}?height=200&width=200`;
    }

    if (id) {
      categoryId.value = id;
    }
  } else {
    switch (response.status) {
      case 413:
        alert('Файл не завантажено. Максималький розмір 5МБ!');
        categoryImgBrowseBtn.disabled = false;
        categoryImgFile.value = '';
        break;
      default:
        break;
    }
  }
};

categoryCurrentImgDeleteForm.onsubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData(categoryCurrentImgDeleteForm);
  formData.set('categoryId', categoryId.value);

  const response = await fetch('/delete/category-photo', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    categoryImgBrowseBtn.disabled = false;
    categoryCurrentImgContainer.style.display = 'none';
    categoryCurrentImg.src = '';
  }
};
