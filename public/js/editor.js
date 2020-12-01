const currentMainMenuId = document.getElementById('current_main_menu').value;
const currentSideMenuId = document.getElementById('current_side_menu').value;
const currentCategoryId = document.getElementById('current_category').value;
const currentNewsType = document.getElementById('current_news_type').value;
const pageTypeRadioBtns = document.getElementsByName('page_type');
const contentPageSubclassRadioBtns = document.getElementsByName('contentPage_type');
const historyWarLinkLabelDropdown = document.getElementById('historyWarLinkLabel-dropdown');
const historyWarLinkLabelNew = document.getElementById('hw-link-lbl');
const pageSubclassFromServer = document.getElementsByName('page-subclass');
const pageType = document.querySelector('[name="page-type"]');
const linksForm = document.getElementById('links-form');
const directLinkInput = document.getElementById('direct-link');
// const linksPagesTab = document.getElementById('v-pills-page-tab');
// const linksOtherTab = document.getElementById('v-pills-contact-tab');
const usefulLinksMainTab = document.getElementById('useful-links-tab');
const mainPhotoTab = document.getElementById('main_photos-tab');
const sliderTab = document.getElementById('slider_photos-tab');
const filesTab = document.getElementById('files-tab');
const wysiwygEditor = document.getElementById('html_body-container');
const hwControls = document.getElementById('history-war-controls');

const instance = new dtsel.DTS('input[name="time_to_publish"]', {
  direction: 'BOTTOM',
  dateFormat: 'dd.mm.yyyy',
  showTime: true,
  timeFormat: 'HH:MM'
});

const linksCheckboxesToRadio = () => {
  const div = document.getElementById('v-pills-tabContentUsefulLinks');
  const checkboxes = Array.from(div.querySelectorAll('input[type="checkbox"]'));

  checkboxes.forEach((checkbox) => {
    checkbox.type = 'radio';
  });
};

const linksRadioToCheckboxes = () => {
  const div = document.getElementById('v-pills-tabContentUsefulLinks');
  const radioButtons = Array.from(div.querySelectorAll('input[type="radio"]'));

  radioButtons.forEach((radio) => {
    radio.type = 'checkbox';
  });

  // linksPagesTab.onclick = null;
  // linksOtherTab.onclick = null;
};

const findCheckedIndexes = (containerId, selector) => {
  const div = document.getElementById(containerId);
  const inputs = Array.from(div.querySelectorAll(selector));
  const checked = [];

  for (let index = 0; index < inputs.length; index++) {
    if (inputs[index].checked) checked.push(index);
  }

  return checked;
};

const resetCheckedInput = (containerId, selector, index) => {
  const div = document.getElementById(containerId);
  const inputs = Array.from(div.querySelectorAll(selector));

  if (index >= 0 && index < inputs.length) {
    inputs[index].checked = false;
  }
};

const filterPagesLinks = (types) => {
  const list = Array.from(document.getElementsByName('user_pages'));
  list.forEach((item) => {
    const itemType = item.getAttribute('data-type');

    if (types && types.includes(itemType) || !types || !types.length) {
      item.closest('label').style.display = 'block';
    } else {
      item.closest('label').style.display = 'none';
    }
  });
};

function showHideNewsTypes({ value }) {
  switch (value) {
    case 'content_page': {
      // document.getElementById('nav-main-menu-tab').style.display = 'block';
      document.getElementById('nav-content-page-other-tab').style.display = 'block';
      document.getElementById('nav-news-other-tab').style.display = 'none';
      document.getElementById('nav-news-category-tab').style.display = 'none';

      const div = document.getElementById('page_controls-group');
      const inputs = Array.from(div.querySelectorAll('[name="contentPage_type"]'));
      let selectedPageSubclassRadio;

      for (let index = 0; index < inputs.length; index++) {
        if (inputs[index].checked) {
          selectedPageSubclassRadio = inputs[index];
          break;
        }
      }
      contentPageSubclassFeatures(selectedPageSubclassRadio);
    }
      break;
    case 'news':
      // document.getElementById('nav-main-menu-tab').style.display = 'none';
      document.getElementById('nav-content-page-other-tab').style.display = 'none';
      document.getElementById('nav-news-other-tab').style.display = 'block';
      document.getElementById('nav-news-category-tab').style.display = 'block';
      mainPhotoTab.style.display = 'block';
      linksRadioToCheckboxes();
      filterPagesLinks();
      usefulLinksMainTab.style.display = 'block';
      break;
    default:
      // document.getElementById('nav-main-menu-tab').style.display = 'none';
      document.getElementById('nav-content-page-other-tab').style.display = 'none';
      document.getElementById('nav-news-other-tab').style.display = 'none';
      document.getElementById('nav-news-category-tab').style.display = 'none';
  }
  // document.getElementById('news-type-casual').required = value === 'news';
  // document.getElementById('news-type-current').required = value === 'news';
  // document.getElementById('news-type-main').required = value === 'news';
}

function contentPageSubclassFeatures({ value }) {
  linksRadioToCheckboxes();

  switch (value) {
    case 'casual':
      usefulLinksMainTab.style.display = 'block';
      mainPhotoTab.style.display = 'none';
      sliderTab.style.display = 'block';
      filesTab.style.display = 'block';
      wysiwygEditor.style.display = 'block';
      hwControls.style.display = 'none';
      filterPagesLinks();
      break;
    case 'historyWar':
      hwControls.style.display = 'block';
      usefulLinksMainTab.style.display = 'none';
      mainPhotoTab.style.display = 'none';
      sliderTab.style.display = 'block';
      filesTab.style.display = 'block';
      wysiwygEditor.style.display = 'block';
      break;
    case 'current':
      usefulLinksMainTab.style.display = 'block';
      mainPhotoTab.style.display = 'block';
      sliderTab.style.display = 'none';
      filesTab.style.display = 'none';
      wysiwygEditor.style.display = 'block';
      hwControls.style.display = 'none';
      linksCheckboxesToRadio();
      filterPagesLinks(['casual', 'contacts', 'files']);
      // linksPagesTab.onclick = () => {
      //   // const indexOther = findCheckedIndexes('v-pills-contact', '[name="user_links"]');
      //   const indexPages = findCheckedIndexes('v-pills-page', '[name="user_pages"]');

      //   if (indexOther.length && indexPages.length) {
      //     resetCheckedInput('v-pills-page', '[name="user_pages"]', indexPages[0]);
      //   }
      // };
      // linksOtherTab.onclick = () => {
        // const indexOther = findCheckedIndexes('v-pills-contact', '[name="user_links"]');
        // const indexPages = findCheckedIndexes('v-pills-page', '[name="user_pages"]');

        // if (indexOther.length && indexPages.length) {
        //   resetCheckedInput('v-pills-contact', '[name="user_links"]', indexOther[0]);
        // }
      // };
      break;
    case 'contacts':
      usefulLinksMainTab.style.display = 'block';
      mainPhotoTab.style.display = 'none';
      sliderTab.style.display = 'none';
      filesTab.style.display = 'none';
      wysiwygEditor.style.display = 'block';
      hwControls.style.display = 'none';
      filterPagesLinks('contacts');
      break;
    case 'files':
      usefulLinksMainTab.style.display = 'block';
      mainPhotoTab.style.display = 'none';
      sliderTab.style.display = 'none';
      filesTab.style.display = 'block';
      wysiwygEditor.style.display = 'none';
      hwControls.style.display = 'none';
      filterPagesLinks('files');
      break;
    default:
      // usefulLinksMainTab.style.display = 'none';
      break;
  }
}

pageTypeRadioBtns.forEach((btn) => {
  btn.onchange = () => showHideNewsTypes(btn);
});

contentPageSubclassRadioBtns.forEach((btn) => {
  btn.onchange = () => contentPageSubclassFeatures(btn);
})

if (currentMainMenuId) {
  const selected = document.getElementById(`generated-menu_${currentMainMenuId}`);
  selected.checked = true;
}

if (currentSideMenuId) {
  const selected = document.getElementById(`generated-sidemenu_${currentSideMenuId}`);
  selected.checked = true;
}

if (currentCategoryId) {
  const selected = document.getElementById(`generated-category_${currentCategoryId}`);
  selected.checked = true;
}

let currentNewsTypeProcessed = '';
switch (currentNewsType) {
  case 'Головна':
    currentNewsTypeProcessed = 'main';
    break;
  case 'Актуальна':
    currentNewsTypeProcessed = 'current';
    break;
  case 'Звичайна':
    currentNewsTypeProcessed = 'casual';
    break;
  default:
    break;
}

if (currentNewsType) {
  const selected = document.getElementById(`news-type-${currentNewsTypeProcessed}`);
  selected.checked = true;
}

if (pageType) {
  switch (pageType.value) {
    case 'news':
      linksRadioToCheckboxes();
      // filterPagesLinks();
      // usefulLinksMainTab.style.display = 'block';
      break;
    case 'content_page':
      contentPageSubclassFeatures(pageSubclassFromServer);
      break;
    default:
      break;
  }
}

historyWarLinkLabelNew.oninput = (event) => {
  const hwListUnchecked = document.getElementById('history-war-list-unselected');
  hwListUnchecked.selected = event.target.value.trim().length > 0;
}

if (historyWarLinkLabelDropdown) {
  historyWarLinkLabelDropdown.onchange = (event) => {
    if (event.target.value.trim().length > 0) {
      historyWarLinkLabelNew.value = '';
    }
  }
}

linksForm.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(linksForm);

  const response = await fetch('/content/links/send', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    alert('Посилання збережено!');
  }
};

const toggleLinksCheckboxesStatusDisabled = () => {
  const hasDirectLink = directLinkInput.value.trim().length > 0;
  const div = document.getElementById('v-pills-tabContentUsefulLinks');
  const checkboxes = Array.from(div.querySelectorAll('input[type="checkbox"]'));
  const radioButtons = Array.from(div.querySelectorAll('input[type="radio"]'));

  if (radioButtons) {
    if (hasDirectLink) {
      radioButtons.forEach((radio) => {
        radio.disabled = true;
        const label = radio.closest('label');
        label.style.color = '#8a8787';
      });

      const selected = findCheckedIndexes('v-pills-tabContentUsefulLinks', 'input[type="radio"]');
      selected.forEach((index) => resetCheckedInput('v-pills-tabContentUsefulLinks', 'input[type="radio"]', index));
    } else {
      radioButtons.forEach((radio) => {
        radio.disabled = false;
        const label = radio.closest('label');
        label.style.color = '#ffffff';
      });
    }
  }

  if (checkboxes) {
    if (hasDirectLink) {
      checkboxes.forEach((checkbox) => {
        checkbox.disabled = true;
        const label = checkbox.closest('label');
        label.style.color = '#8a8787';
      });

      const selected = findCheckedIndexes('v-pills-tabContentUsefulLinks', 'input[type="checkbox"]');
      selected.forEach((index) => resetCheckedInput('v-pills-tabContentUsefulLinks', 'input[type="checkbox"]', index));
    } else {
      checkboxes.forEach((checkbox) => {
        checkbox.disabled = false;
        const label = checkbox.closest('label');
        label.style.color = '#ffffff';
      });
    }
  }
};

directLinkInput.oninput = toggleLinksCheckboxesStatusDisabled;
toggleLinksCheckboxesStatusDisabled();
