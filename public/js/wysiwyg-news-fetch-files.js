const newsId = document.getElementById('news-id');
const filesNewForm = document.getElementById('files-new-form');
const filesNew = document.getElementById('new-files');
const filesNewBrowseBtn = document.getElementById('browse-files-new');
const filesNewSubmitBtn = document.getElementById('submit-files-new');
const filesAddForm = document.getElementById('files-add-form');
const filesAdd = document.getElementById('add-files');
const filesAddBrowseBtn = document.getElementById('browse-files-add');
const filesAddSubmitBtn = document.getElementById('submit-files-add');
const filesCurrentContainer = document.getElementById('files-current-container');

const hasCurrentFiles = document.getElementById('files-tbody')
  .innerHTML
  .trim()
  .length > 0;

const getFileDeleteFormsList = (className) => {
  const filesDeleteForms = document.getElementsByClassName(className);
  return Array.from(filesDeleteForms);
};

const initDeleteFile = (form) => {
  form.onsubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    formData.set('contentId', newsId.value);
    formData.set('contentType', 'news');

    const response = await fetch('/delete/file', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const { filenames } = await response.json();
      renderCurrentFiles(filenames, newsId);
    }
  };
};

const initDeleteFiles = () => {
  const forms = getFileDeleteFormsList('file-delete-form');
  forms.forEach((form) => initDeleteFile(form));
};

const renderCurrentFiles = (filenames, contentId) => {
  const tableBody = document.getElementById('files-tbody');
  const row = (filename) => (
  `<tr>
    <td class="text-left"><p height="40px">${filename}</p></td>
    <td>
      <form class="file-delete-form">
        <input name="newsId" value="${contentId}" type="hidden">
        <input name="filename" value="${filename}" type="hidden">
        <button type="submit" class="button delete-btn" >Видалити</button>
      </form>
    </td>
  </tr>`);

  if (filenames.length) {
    tableBody.innerHTML = filenames.map((filename) => row(filename)).join('\n');
    initDeleteFiles();
    filesCurrentContainer.style.display = 'block';
    filesAddForm.style.display = 'block';
  } else {
    filesCurrentContainer.style.display = 'none';
    filesAddForm.style.display = 'none';
    filesNewBrowseBtn.disabled = false;
  }
};

filesNewBrowseBtn.onclick = () => filesNew.click();
filesAddBrowseBtn.onclick = () => filesAdd.click();

filesNew.oninput = () => {
  filesNewSubmitBtn.disabled = false;
  filesNewBrowseBtn.disabled = true;
};

filesAdd.oninput = () => {
  filesAddSubmitBtn.disabled = false;
  filesAddBrowseBtn.disabled = true;
};

filesNewForm.onsubmit = async (event) => {
  event.preventDefault();
  filesNewSubmitBtn.disabled = true;

  const formData = new FormData(filesNewForm);
  formData.set('contentId', newsId.value);
  formData.set('contentType', 'news');

  const response = await fetch('/upload/files', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const { filenames, contentId: id } = await response.json();

    if (filenames) {
      filesNewBrowseBtn.disabled = true;
      filesNew.value = null;
      filesCurrentContainer.style.display = 'block';
      renderCurrentFiles(filenames, id);
    }

    if (id) {
      newsId.value = id;
    }
  }
};

filesAddForm.onsubmit = async (event) => {
  event.preventDefault();
  filesAddSubmitBtn.disabled = true;

  const formData = new FormData(filesAddForm);
  formData.set('contentId', newsId.value);
  formData.set('contentType', 'news');

  const response = await fetch('/add/files', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const { filenames } = await response.json();

    if (filenames) {
      filesAdd.value = null;
      filesAddBrowseBtn.disabled = false;
      renderCurrentFiles(filenames, newsId.value);
    }
  }
};

if (hasCurrentFiles) {
  filesCurrentContainer.style.display = 'block';
  filesNewBrowseBtn.disabled = true;
  filesAddForm.style.display = 'block';
  initDeleteFiles();
}
