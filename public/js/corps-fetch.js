const corpsId = document.getElementById('corps-id');
const corpsSignForm = document.getElementById('corps-sign-form');
const corpsSignFile = document.getElementById('corps-sign-file');
const corpsSignBrowseBtn = document.getElementById('browse-corps-sign');
const corpsSignSubmitBtn = document.getElementById('submit-corps-sign');
const corpsSignCurrentContainer = document.getElementById('corps-sign-current-container');
const corpsSignCurrentImg = document.getElementById('corps-sign-current');
const corpsSignCurrentDeleteForm = document.getElementById('corps-sign-current-delete');

document.body.onload = () => {
  const src = corpsSignCurrentImg.getAttribute('src');
  if (src) {
    corpsSignCurrentContainer.style.display = 'block';
    corpsSignBrowseBtn.disabled = true;
  }
};

corpsSignBrowseBtn.onclick = () => corpsSignFile.click();

corpsSignFile.oninput = () => {
  corpsSignSubmitBtn.disabled = false;
  corpsSignBrowseBtn.disabled = true;
};

corpsSignForm.onsubmit = async (event) => {
  event.preventDefault();
  corpsSignSubmitBtn.disabled = true;

  const formData = new FormData(corpsSignForm);
  formData.set('corpsId', corpsId.value);

  const response = await fetch('/upload/corps/sign', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const { filename, corpsId: id } = await response.json();

    if (filename) {
      corpsSignBrowseBtn.disabled = true;
      corpsSignFile.value = null;
      corpsSignCurrentContainer.style.display = 'block';
      corpsSignCurrentImg.src = `/icon/${filename}?height=200&width=300`;
    }

    if (id) {
      corpsId.value = id;
    }
  } else {
    switch (response.status) {
      case 413:
        alert('Файл не завантажено. Максималький розмір 5МБ!');
        corpsSignBrowseBtn.disabled = false;
        corpsSignFile.value = '';
        break;
      default:
        break;
    }
  }
};

corpsSignCurrentDeleteForm.onsubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData(corpsSignCurrentDeleteForm);
  formData.set('corpsId', corpsId.value);

  const response = await fetch('/delete/corps/sign', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    corpsSignBrowseBtn.disabled = false;
    corpsSignCurrentContainer.style.display = 'none';
    corpsSignCurrentImg.src = '';
  }
};
