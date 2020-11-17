const currentMainMenuId = document.getElementById('current_main_menu').value;
const currentSideMenuId = document.getElementById('current_side_menu').value;
const currentCategoryId = document.getElementById('current_category').value;
const currentNewsType = document.getElementById('current_news_type').value;

const pageTypeRadioBtns = document.getElementsByName('page_type');

const contentPageSubclassRadioBtns = document.getElementsByName('contentPage_type');
const historyWarLinkLabelDropdown = document.getElementById('historyWarLinkLabel-dropdown');
const historyWarLinkLabelNew = document.getElementById('hw-link-lbl');
const pageSubclass = document.querySelector('[name="page-subclass"]');
const pageType = document.querySelector('[name="page-type"]');

function showHideNewsTypes({ value }) {
  switch (value) {
    case 'content_page':
      // document.getElementById('nav-main-menu-tab').style.display = 'block';
      document.getElementById('nav-content-page-other-tab').style.display = 'block';
      document.getElementById('nav-news-other-tab').style.display = 'none';
      document.getElementById('nav-news-category-tab').style.display = 'none';
      break;
    case 'news':
      // document.getElementById('nav-main-menu-tab').style.display = 'none';
      document.getElementById('nav-content-page-other-tab').style.display = 'none';
      document.getElementById('nav-news-other-tab').style.display = 'block';
      document.getElementById('nav-news-category-tab').style.display = 'block';
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
  historyWarLinkLabelNew.disabled = true;
  if (historyWarLinkLabelDropdown) {
    historyWarLinkLabelDropdown.disabled = true;
  }
  // historyWarLinkLabelNew.required = false;

  switch (value) {
    case 'casual':
      break;
    case 'historyWar':
      historyWarLinkLabelNew.disabled = false;
      if (historyWarLinkLabelDropdown) {
        historyWarLinkLabelDropdown.disabled = false;
      }
      // historyWarLinkLabelNew.required = true;
      break;
    default:
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
      
      break;
    case 'content_page':
      contentPageSubclassFeatures(pageSubclass);
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

