const linkImgInput = document.getElementById('link-img-input');
const linkImgSubmitBtn = document.getElementById('send-link-img-submit');
const linkImgSendBtn = document.getElementById('send-link-img-btn');

linkImgSendBtn.onclick = () => linkImgInput.click();

linkImgInput.oninput = () => {
  linkImgSubmitBtn.disabled = false;
};
