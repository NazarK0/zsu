// const linkImgForm = document.getElementById('send-link-img-form');
const submitBtn = document.getElementById('send-link-img-submit');
const input = document.getElementById('link-img-input');
const linkImgDelete = document.getElementById('delete-link-img');
const linkImage = document.getElementById('link-image');
const currentImgBlock = document.getElementById('current-link-img');
const linkIdInput = document.getElementById('link-id');

linkImgDelete.onclick = async () => {
  const linkId = linkImgDelete.getAttribute('data-link-id');
  const response = await fetch(`/link-img/delete/${linkId}`, {
    method: 'POST',
  });

  if (response.ok) {
    currentImgBlock.style.display = 'none';
  }
};

submitBtn.onclick = async () => {
  const formData = new FormData();
  formData.set('link_img', input.files[0]);

  const linkId = submitBtn.getAttribute('data-link-id');

  if (linkId) {
    formData.set('linkId', linkId);
  }

  const response = await fetch('/link-img/send', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const { img, id } = await response.json();

    linkImage.src = `/link-img/${img}`;
    submitBtn.disabled = true;
    input.value = '';
    linkIdInput.value = id;
    currentImgBlock.style.display = 'flex';
  }
};

document.body.onload = () => {
  const currentImg = linkImage.getAttribute('src');

  if (currentImg) {
    currentImgBlock.style.display = 'flex';
  }
};
