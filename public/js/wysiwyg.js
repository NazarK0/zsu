const mainPhotoCurrent = document.getElementById('main_photo-current');
const mainPhotoCurrentContainer = document.getElementById('main_photo-current_container');
const mainPhotoForm = document.getElementById('send-main-photo_form');
const mainPhotoSubmitBtn = document.getElementById('main_photo-send-submit');
const mainPhotoInput = document.getElementById('main_photo-input');
const mainPhotoDeleteForm = document.getElementById('delete-main-photo_form');
const mainPhotoSendBtn = document.getElementById('send-main_photo-btn');

const sliderCurrentContainer = document.getElementById('slider-current_container');
const sliderForm = document.getElementById('send-slider_form');
const sliderSubmitBtn = document.getElementById('slider-send-submit');
const sliderInput = document.getElementById('slider-input');
const sliderTableBody = document.getElementById('slider-tbody');
const sliderAddForm = document.getElementById('add-slider_form');
const sliderAddSubmitBtn = document.getElementById('slider-add-submit');
const sliderAddInput = document.getElementById('add_slider-input');
const sliderAddBtn = document.getElementById('add-slider-btn');
const sliderSendBtn = document.getElementById('send-slider-btn');

const filesCurrentContainer = document.getElementById('files-current_container');
const filesForm = document.getElementById('send-files_form');
const filesSubmitBtn = document.getElementById('files-send-submit');
const filesInput = document.getElementById('files-input');
const filesTableBody = document.getElementById('files-tbody');
const filesAddForm = document.getElementById('add-files_form');
const filesAddSubmitBtn = document.getElementById('files-add-submit');
const filesAddInput = document.getElementById('add_files-input');
const filesAddBtn = document.getElementById('add-files-btn');
const filesSendBtn = document.getElementById('send-files-btn');

const tableRowSlider = (folder_path, filename, id, idx, port = '1337') => (
  `<tr>
    <td class="text-left">
      <img class="slider_img-current" src="${folder_path}sliders/${filename}" height="90px"/>
    </td>
    <td>
      <form id="delete-slider-image_form-${idx}" data-group="delete-slider-img">
        <input name="filename" value="${filename}" type="hidden">
        <input name="id" value="${id}" type="hidden">
        <button type="submit" class="button delete-btn">Видалити</button>
      </form>
    </td>
  </tr>`);

const sliderInitDeleteFormsAction = (selector) => {
  const sliderDeleteFormList = document.querySelectorAll(selector);

  if (sliderDeleteFormList.length) {
    sliderAddForm.style.display = 'block';
  }

  sliderDeleteFormList.forEach((form) => {
    form.onsubmit = async (e) => {
      e.preventDefault();
      const id = e.currentTarget.id.value;
      const filename = e.currentTarget.filename.value;

      const response = await fetch(`/delete/slider/${id}/${filename}`, {
        method: 'POST',
      });

      if (response.ok) {
        const { folder, filenames = null } = await response.json();
        if (sliderCurrentContainer && filenames) {
          const currentImagesRows = filenames.map((file, idx) => tableRowSlider(folder, file, id, idx));
          sliderTableBody.innerHTML = currentImagesRows.join('\n');
          sliderInitDeleteFormsAction('[data-group="delete-slider-img"]');
          if (filenames.length === 0) {
            sliderCurrentContainer.style.display = 'none';
            sliderAddForm.style.display = 'none';
          }
        }
      }
    };
  });
};

const tableRowFiles = (filename, id, idx) => (
  `<tr>
    <td class="text-left"><p height="40px">${filename}</p></td>
    <td>
      <form id="delete-file_form-${idx}" data-group="delete-file-form">
        <input name="filename" value="${filename}" type="hidden">
        <input name="id" value="${id}" type="hidden">
        <button type="submit" class="button delete-btn">Видалити</button>
      </form>
    </td>
  </tr>`);

const filesInitDeleteFormsAction = (selector) => {
  const filesDeleteFormList = document.querySelectorAll(selector);

  if (filesDeleteFormList.length) {
    filesAddForm.style.display = 'block';
  }

  filesDeleteFormList.forEach((form) => {
    form.onsubmit = async (e) => {
      e.preventDefault();
      const id = e.currentTarget.id.value;
      const filename = e.currentTarget.filename.value;

      const response = await fetch(`/delete/file/${id}/${filename}`, {
        method: 'POST',
      });

      if (response.ok) {
        const { filenames = null } = await response.json();
        if (filesCurrentContainer && filenames) {
          const currentFilesRows = filenames.map((file, idx) => tableRowFiles(file, id, idx));
          filesTableBody.innerHTML = currentFilesRows.join('\n');
          filesInitDeleteFormsAction('[data-group="delete-file-form"]');
          if (filenames.length === 0) {
            filesCurrentContainer.style.display = 'none';
            filesAddForm.style.display = 'none';
          }
        }
      }
    };
  });
};

mainPhotoInput.oninput = () => {

  mainPhotoSubmitBtn.disabled = false;
  
};

mainPhotoForm.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(mainPhotoForm);

  const response = await fetch('/upload/main-photo', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const { folder, filename = null } = await response.json();

    if (filename) {
      mainPhotoSubmitBtn.disabled = true;
      mainPhotoInput.value = null;
      mainPhotoCurrentContainer.style.display = 'block';
      mainPhotoCurrent.src = `${folder}middlesize/${filename}`;
    }
  }
};

mainPhotoDeleteForm.onsubmit = async (e) => {
  e.preventDefault();

  const response = await fetch('/delete/main-photo', {
    method: 'POST',
    body: new FormData(mainPhotoDeleteForm),
  });

  if (response.ok) {
    if (mainPhotoCurrentContainer) {
      mainPhotoCurrentContainer.style.display = 'none';
      mainPhotoCurrent.src = '';
    }
  }
};

mainPhotoSendBtn.onclick = () => mainPhotoInput.click();

sliderInput.oninput = () => {
  sliderSubmitBtn.disabled = false;
};

sliderForm.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(sliderForm);

  const response = await fetch('/upload/slider', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const { filenames = null, folder, id } = await response.json();

    if (filenames) {
      const currentImagesRows = filenames.map((item, idx) => tableRowSlider(folder, item, id, idx));

      sliderTableBody.innerHTML = currentImagesRows.join('\n');
      sliderSubmitBtn.disabled = true;
      sliderInput.value = '';
      sliderCurrentContainer.style.display = 'block';
      sliderAddForm.style.display = 'block';
      sliderInitDeleteFormsAction('[data-group="delete-slider-img"]');
    }
  }
};

sliderAddInput.oninput = () => {
  sliderAddSubmitBtn.disabled = false;
};

sliderAddForm.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(sliderAddForm);

  const response = await fetch('/add/slider', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const { filenames = null, folder, id } = await response.json();
    if (filenames) {
      const currentImagesRows = filenames.map((item, idx) => tableRowSlider(folder, item, id, idx));

      sliderTableBody.innerHTML = currentImagesRows.join('\n');
      sliderAddSubmitBtn.disabled = true;
      sliderAddInput.value = '';
      sliderInitDeleteFormsAction('[data-group="delete-slider-img"]');
    }
  }
};

sliderAddBtn.onclick = () => sliderAddInput.click();
sliderSendBtn.onclick = () => sliderInput.click();

filesInput.oninput = () => {
  filesSubmitBtn.disabled = false;
};

filesForm.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(filesForm);

  const response = await fetch('/upload/files', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const { filenames = null, id } = await response.json();

    if (filenames) {
      const currentFilesRows = filenames.map((item, idx) => tableRowFiles(item, id, idx));

      filesTableBody.innerHTML = currentFilesRows.join('\n');
      filesSubmitBtn.disabled = true;
      filesInput.value = '';
      filesCurrentContainer.style.display = 'block';
      filesAddForm.style.display = 'block';
      filesInitDeleteFormsAction('[data-group="delete-file-form"]');
    }
  }
};

filesAddInput.oninput = () => {
  filesAddSubmitBtn.disabled = false;
};

filesAddForm.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(filesAddForm);

  const response = await fetch('/add/files', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const { filenames = null, id } = await response.json();
    if (filenames) {
      const currentFilesRows = filenames.map((item, idx) => tableRowFiles(item, id, idx));

      filesTableBody.innerHTML = currentFilesRows.join('\n');
      filesAddSubmitBtn.disabled = true;
      filesAddInput.value = '';
      filesInitDeleteFormsAction('[data-group="delete-file-form"]');
    }
  }
};

filesAddBtn.onclick = () => filesAddInput.click();
filesSendBtn.onclick = () => filesInput.click();

document.body.onload = () => {
  sliderInitDeleteFormsAction('[data-group="delete-slider-img"]');
  filesInitDeleteFormsAction('[data-group="delete-file-form"]');
};
