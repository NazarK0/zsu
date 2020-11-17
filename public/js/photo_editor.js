const signInput = document.getElementById('sign_photo');
const signSubmitBtn = document.getElementById('send-sign-submit');
const signSendBtn = document.getElementById('send-sign-btn');

const bgInput = document.getElementById('background_photo');
const bgSubmitBtn = document.getElementById('send-bg-submit');
const bgSendBtn = document.getElementById('send-bg-btn');

signSendBtn.onclick = () => signInput.click();
bgSendBtn.onclick = () => bgInput.click();

signInput.oninput = () => {
  signSubmitBtn.disabled = false;
};

bgInput.oninput = () => {
  bgSubmitBtn.disabled = false;
};
