const photoCategoryId = document.getElementById('photo-category-id');
const galeryNewForm = document.getElementById('galery-new-form');
const galeryNewFiles = document.getElementById('galery-new-files');
const galeryNewBrowseBtn = document.getElementById('browse-galery-new');
const galeryNewSubmitBtn = document.getElementById('submit-galery-new');
const galeryAddForm = document.getElementById('galery-add-form');
const galeryAddFiles = document.getElementById('galery-add-files');
const galeryAddBrowseBtn = document.getElementById('browse-galery-add');
const galeryAddSubmitBtn = document.getElementById('submit-galery-add');
const galeryCurrentContainer = document.getElementById('galery-current-container');

const hasCurrentImages = document.getElementById('galery-tbody')
  .innerHTML
  .trim()
  .length > 0;

const getImgDeleteFormsList = (className) => {
  const galeryImgDeleteForms = document.getElementsByClassName(className);
  return Array.from(galeryImgDeleteForms);
};

const initDeleteImage = (form) => {
  form.onsubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    formData.set('categoryId', photoCategoryId.value);

    const response = await fetch('/delete/galery-image', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const { filenames } = await response.json();
      renderCurrentSliderImages(filenames, photoCategoryId);
    }
  };
};

const initDeleteSliderImages = () => {
  const forms = getImgDeleteFormsList('galery-image-delete-form');
  forms.forEach((form) => initDeleteImage(form));
};

const renderCurrentSliderImages = (filenames, categoryId) => {
  const tableBody = document.getElementById('galery-tbody');
  const row = (filename) => (
  `<tr>
    <td class="text-left">
      <img src="/icon/${filename}?height=90&width=150" alt="${filename}"/>
    </td>
    <td>
      <form class="galery-image-delete-form">
        <input name="photoCategoryId" value="${categoryId}" type="hidden">
        <input name="filename" value="${filename}" type="hidden">
        <button type="submit" class="button delete-btn" >Видалити</button>
      </form>
    </td>
  </tr>`);

  if (filenames.length) {
    tableBody.innerHTML = filenames.map((filename) => row(filename)).join('\n');
    initDeleteSliderImages();
    galeryCurrentContainer.style.display = 'block';
    galeryAddForm.style.display = 'block';
  } else {
    galeryCurrentContainer.style.display = 'none';
    galeryAddForm.style.display = 'none';
    galeryNewBrowseBtn.disabled = false;
  }
};

galeryNewBrowseBtn.onclick = () => galeryNewFiles.click();
galeryAddBrowseBtn.onclick = () => galeryAddFiles.click();

galeryNewFiles.oninput = () => {
  galeryNewSubmitBtn.disabled = false;
  galeryNewBrowseBtn.disabled = true;
};

galeryAddFiles.oninput = () => {
  galeryAddSubmitBtn.disabled = false;
  galeryAddBrowseBtn.disabled = true;
};

galeryNewForm.onsubmit = async (event) => {
  event.preventDefault();
  galeryNewSubmitBtn.disabled = true;

  const formData = new FormData(galeryNewForm);
  formData.set('categoryId', photoCategoryId.value);

  const response = await fetch('/upload/galery', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const { filenames, categoryId: id, oversize } = await response.json();

    if (filenames) {
      galeryNewBrowseBtn.disabled = true;
      galeryNewFiles.value = null;
      galeryCurrentContainer.style.display = 'block';
      renderCurrentSliderImages(filenames, id);
    }

    if (oversize.length) {
      alert(`Деякі файли були пропущені. Максимальний розмір файлу 5 МБ.
      Пропущені файли: 
      ${oversize.join('\n')}`);
    }

    if (id) {
      photoCategoryId.value = id;
    }
  }
};

galeryAddForm.onsubmit = async (event) => {
  event.preventDefault();
  galeryAddSubmitBtn.disabled = true;

  const formData = new FormData(galeryAddForm);
  formData.set('categoryId', photoCategoryId.value);

  const response = await fetch('/add/galery', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const { filenames, oversize } = await response.json();

    if (filenames) {
      galeryAddFiles.value = null;
      galeryAddBrowseBtn.disabled = false;
      renderCurrentSliderImages(filenames, photoCategoryId.value);
    }

    if (oversize.length) {
      alert(`Деякі файли були пропущені. Максимальний розмір файлу 5 МБ.
      Пропущені файли: 
      ${oversize.join('\n')}`);
    }
  }
};

if (hasCurrentImages) {
  galeryCurrentContainer.style.display = 'block';
  galeryNewBrowseBtn.disabled = true;
  galeryAddForm.style.display = 'block';
  initDeleteSliderImages();
}
