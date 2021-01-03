// const linkImgForm = document.getElementById('send-link-img-form');
const submitBtn = document.getElementById('send-link-img-submit');
const input = document.getElementById('link-img-input');
const linkImgDelete = document.getElementById('delete-link-img');
const linkImage = document.getElementById('link-image');
const currentImgBlock = document.getElementById('current-link-img');
const linkIdInput = document.getElementById('link-id');
const linkImgBrowseBtn = document.getElementById('send-link-img-btn');

linkImgBrowseBtn.onclick = () => input.click();

input.oninput = () => {
  submitBtn.disabled = false;
};

linkImgDelete.onclick = async () => {
  const response = await fetch(`/link-img/delete/${linkIdInput.value}`, {
    method: 'POST',
  });

  if (response.ok) {
    currentImgBlock.style.display = 'none';
    linkImgBrowseBtn.disabled = false;
  }
};

submitBtn.onclick = async () => {
  const formData = new FormData();
  formData.set('link_img', input.files[0]);
  formData.set('linkId', linkIdInput.value);

  const response = await fetch('/link-img/send', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const { img, id } = await response.json();

    linkImage.src = `/image/${img}?width=300&height=200`;
    submitBtn.disabled = true;
    linkImgBrowseBtn.disabled = true;
    input.value = '';
    linkIdInput.value = id;
    currentImgBlock.style.display = 'flex';
  } else {
    switch (response.status) {
      case 413:
        alert('Файл не завантажено. Максималький розмір 5МБ!');
        submitBtn.disabled = true;
        input.value = '';
        break;
      default:
        break;
    }
  }
};

document.body.onload = () => {
  const currentImg = linkImage.getAttribute('src');

  if (currentImg) {
    currentImgBlock.style.display = 'flex';
  }
};
