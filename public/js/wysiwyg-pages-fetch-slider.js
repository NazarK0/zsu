const pageId = document.getElementById('page-id');
const sliderNewForm = document.getElementById('slider-new-form');
const sliderNewFiles = document.getElementById('slider-new-files');
const sliderNewBrowseBtn = document.getElementById('browse-slider-new');
const sliderNewSubmitBtn = document.getElementById('submit-slider-new');
const sliderAddForm = document.getElementById('slider-add-form');
const sliderAddFiles = document.getElementById('slider-add-files');
const sliderAddBrowseBtn = document.getElementById('browse-slider-add');
const sliderAddSubmitBtn = document.getElementById('submit-slider-add');
const sliderCurrentContainer = document.getElementById('slider-current-container');

const hasCurrentImages = document.getElementById('slider-tbody')
  .innerHTML
  .trim()
  .length > 0;

const getImgDeleteFormsList = (className) => {
  const sliderImgDeleteForms = document.getElementsByClassName(className);
  return Array.from(sliderImgDeleteForms);
};

const initDeleteImage = (form) => {
  form.onsubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    formData.set('contentId', pageId.value);
    formData.set('contentType', 'page');

    const response = await fetch('/delete/slider-image', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const { filenames } = await response.json();
      renderCurrentSliderImages(filenames, pageId);
    }
  };
};

const initDeleteSliderImages = () => {
  const forms = getImgDeleteFormsList('slider-image-delete-form');
  forms.forEach((form) => initDeleteImage(form));
};

const renderCurrentSliderImages = (filenames, contentId) => {
  const tableBody = document.getElementById('slider-tbody');
  const row = (filename) => (
  `<tr>
    <td class="text-left">
      <img src="/icon/${filename}?height=90&width=150" alt="${filename}"/>
    </td>
    <td>
      <form class="slider-image-delete-form">
        <input name="newsId" value="${contentId}" type="hidden">
        <input name="filename" value="${filename}" type="hidden">
        <button type="submit" class="button delete-btn" >Видалити</button>
      </form>
    </td>
  </tr>`);

  if (filenames.length) {
    tableBody.innerHTML = filenames.map((filename) => row(filename)).join('\n');
    initDeleteSliderImages();
    sliderCurrentContainer.style.display = 'block';
    sliderAddForm.style.display = 'block';
  } else {
    sliderCurrentContainer.style.display = 'none';
    sliderAddForm.style.display = 'none';
    sliderNewBrowseBtn.disabled = false;
  }
};

sliderNewBrowseBtn.onclick = () => sliderNewFiles.click();
sliderAddBrowseBtn.onclick = () => sliderAddFiles.click();

sliderNewFiles.oninput = () => {
  sliderNewSubmitBtn.disabled = false;
  sliderNewBrowseBtn.disabled = true;
};

sliderAddFiles.oninput = () => {
  sliderAddSubmitBtn.disabled = false;
  sliderAddBrowseBtn.disabled = true;
};

sliderNewForm.onsubmit = async (event) => {
  event.preventDefault();
  sliderNewSubmitBtn.disabled = true;

  const formData = new FormData(sliderNewForm);
  formData.set('contentId', pageId.value);
  formData.set('contentType', 'page');

  const response = await fetch('/upload/slider', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const { filenames, contentId: id, oversize } = await response.json();

    if (filenames) {
      sliderNewBrowseBtn.disabled = true;
      sliderNewFiles.value = null;
      sliderCurrentContainer.style.display = 'block';
      renderCurrentSliderImages(filenames, id);
    }

     if (oversize.length) {
      alert(`Деякі файли були пропущені. Максимальний розмір файлу 5 МБ.
      Пропущені файли: 
      ${oversize.join('\n')}`);
    }

    if (id) {
      pageId.value = id;
    }
  }
};

sliderAddForm.onsubmit = async (event) => {
  event.preventDefault();
  sliderAddSubmitBtn.disabled = true;

  const formData = new FormData(sliderAddForm);
  formData.set('contentId', pageId.value);
  formData.set('contentType', 'page');

  const response = await fetch('/add/slider', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const { filenames, oversize } = await response.json();

    if (filenames) {
      sliderAddFiles.value = null;
      sliderAddBrowseBtn.disabled = false;
      renderCurrentSliderImages(filenames, pageId.value);
    }

    if (oversize.length) {
    alert(`Деякі файли були пропущені. Максимальний розмір файлу 5 МБ.
    Пропущені файли: 
    ${oversize.join('\n')}`);
  }
  }
};

if (hasCurrentImages) {
  sliderCurrentContainer.style.display = 'block';
  sliderNewBrowseBtn.disabled = true;
  sliderAddForm.style.display = 'block';
  initDeleteSliderImages();
}
