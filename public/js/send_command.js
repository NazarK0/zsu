const backgroundAddForm = document.getElementById('send-bg_form');
const backgroundAddSubmitBtn = document.getElementById('send-bg-submit');
const backgroundAddInput = document.getElementById('background_photo');
const backgroundContainer = document.getElementById('container-bg');

const signAddForm = document.getElementById('send-sign_form');
const signAddSubmitBtn = document.getElementById('send-sign-submit');
const signAddInput = document.getElementById('sign_photo');
const signContainer = document.getElementById('container-sign');

const tableRowBG = (id, base64) => (
  `<tr>
    <td class="text-left"><img src="data:image/jpeg;base64,${base64}" height="90px"></td>
    <td class="left-text">
      <form data-group="delete-bg-img">
        <input name="id" value="${id}" type="hidden">
        <button type="submit" class="button delete-btn">Видалити</button>
      </form>
    </td>
  </tr>`);

const tableRowSign = (id, base64) => (
  `<tr>
    <td class="text-left"><img src="data:image/jpeg;base64,${base64}" height="60px"></td>
    <td class="left-text">
      <form data-group="delete-sign-img">
        <input name="id" value="${id}" type="hidden">
        <button type="submit" class="button delete-btn">Видалити</button>
      </form>
    </td>
  </tr>`);

const backgroundInitDeleteFormsAction = (selector) => {
  const backgroundDeleteFormList = document.querySelectorAll(selector);

  backgroundDeleteFormList.forEach((form) => {
    form.onsubmit = async (e) => {
      e.preventDefault();
      const del_id = e.currentTarget.id.value;

      const response = await fetch(`/command/bg/delete/${del_id}`, {
        method: 'POST',
      });

      if (response.ok) {
        const backgrounds = await response.json();
        const updatedRows = backgrounds
          .map(({ _id, base64 }) => tableRowBG(_id, base64))
          .join('\n');

        backgroundContainer.innerHTML = updatedRows;
        backgroundInitDeleteFormsAction('[data-group="delete-bg-img"]');
      }
    };
  });
};

const signInitDeleteFormsAction = (selector) => {
  const signDeleteFormList = document.querySelectorAll(selector);

  signDeleteFormList.forEach((form) => {
    form.onsubmit = async (e) => {
      e.preventDefault();
      const del_id = e.currentTarget.id.value;

      const response = await fetch(`/command/sign/delete/${del_id}`, {
        method: 'POST',
      });

      if (response.ok) {
        const signs = await response.json();
        const updatedRows = signs
          .map(({ _id, base64 }) => tableRowSign(_id, base64))
          .join('\n');

        signContainer.innerHTML = updatedRows;
        signInitDeleteFormsAction('[data-group="delete-sign-img"]');
      }
    };
  });
};

backgroundAddForm.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(backgroundAddForm);

  const response = await fetch('/command/bg/add', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const backgrounds = await response.json();
    const updatedRows = backgrounds
      .map(({ _id, base64 }) => tableRowBG(_id, base64))
      .join('\n');

    backgroundContainer.innerHTML = updatedRows;
    backgroundInitDeleteFormsAction('[data-group="delete-bg-img"]');
    backgroundAddSubmitBtn.disabled = true;
    backgroundAddInput.value = '';
  }
};

signAddForm.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(signAddForm);

  const response = await fetch('/command/sign/add', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const backgrounds = await response.json();
    const updatedRows = backgrounds
      .map(({ _id, base64 }) => tableRowSign(_id, base64))
      .join('\n');

    signContainer.innerHTML = updatedRows;
    signInitDeleteFormsAction('[data-group="delete-sign-img"]');
    signAddSubmitBtn.disabled = true;
    signAddInput.value = '';
  }
};

document.body.onload = () => {
  backgroundInitDeleteFormsAction('[data-group="delete-bg-img"]');
  signInitDeleteFormsAction('[data-group="delete-sign-img"]');
};
