const commandId = document.getElementById('command-id');
const commandSignForm = document.getElementById('command-sign-form');
const commandSignFile = document.getElementById('command-sign-file');
const commandSignBrowseBtn = document.getElementById('browse-command-sign');
const commandSignSubmitBtn = document.getElementById('submit-command-sign');
const commandSignCurrentContainer = document.getElementById('command-sign-current-container');
const commandSignCurrentImg = document.getElementById('command-sign-current');
const commandSignCurrentDeleteForm = document.getElementById('command-sign-current-delete');

document.body.onload = () => {
  const src = commandSignCurrentImg.getAttribute('src');
  if (src) {
    commandSignCurrentContainer.style.display = 'block';
    commandSignBrowseBtn.disabled = true;
  }
};

commandSignBrowseBtn.onclick = () => commandSignFile.click();

commandSignFile.oninput = () => {
  commandSignSubmitBtn.disabled = false;
  commandSignBrowseBtn.disabled = true;
};

commandSignForm.onsubmit = async (event) => {
  event.preventDefault();
  commandSignSubmitBtn.disabled = true;

  const formData = new FormData(commandSignForm);
  formData.set('commandId', commandId.value);

  const response = await fetch('/upload/command/sign', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const { filename, commandId: id } = await response.json();

    if (filename) {
      commandSignBrowseBtn.disabled = true;
      commandSignFile.value = null;
      commandSignCurrentContainer.style.display = 'block';
      commandSignCurrentImg.src = `/icon/${filename}?height=200&width=300`;
    }

    if (id) {
      commandId.value = id;
    }
  } else {
    switch (response.status) {
      case 413:
        alert('Файл не завантажено. Максималький розмір 5МБ!');
        commandSignBrowseBtn.disabled = false;
        commandSignFile.value = '';
        break;
      default:
        break;
    }
  }
};

commandSignCurrentDeleteForm.onsubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData(commandSignCurrentDeleteForm);
  formData.set('commandId', commandId.value);

  const response = await fetch('/delete/command/sign', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    commandSignBrowseBtn.disabled = false;
    commandSignCurrentContainer.style.display = 'none';
    commandSignCurrentImg.src = '';
  }
};
