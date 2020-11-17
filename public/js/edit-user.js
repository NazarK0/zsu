const selectUserCategories = document.getElementById('select-user-categories');
const userRightsTab = document.getElementById('user-rights-tab');

const categoryNews = document.getElementById('category-news');
const contentListNews = document.getElementById('content-list-news');

const categoryPages = document.getElementById('category-pages');
const contentListPages = document.getElementById('content-list-pages');

const categoryMenu = document.getElementById('category-menu');
const contentListMenu = document.getElementById('content-list-menu');

const categoryLinks = document.getElementById('category-links');
const contentListLinks = document.getElementById('content-list-links');

const categoryCorps = document.getElementById('category-corps');
const contentListCorps = document.getElementById('content-list-corps');

const categoryCommand = document.getElementById('category-command');
const contentListCommand = document.getElementById('content-list-command');

const categoryUsers = document.getElementById('category-users');
const contentListUsers = document.getElementById('content-list-users');

const categoryContacts = document.getElementById('category-contacts');
const contentListContacts = document.getElementById('content-list-contacts');

selectUserCategories.onchange = () => {
  switch (selectUserCategories.value) {
    case 'all':
      userRightsTab.classList.add('disabled');
      break;
    case 'setup':
      userRightsTab.classList.remove('disabled');
      break;
    default:
      break;
  }
};

categoryNews.onchange = () => {
  if (categoryNews.checked) {
    contentListNews.classList.remove('disabled');
  } else {
    contentListNews.classList.add('disabled');
  }
};

categoryPages.onchange = () => {
  if (categoryPages.checked) {
    contentListPages.classList.remove('disabled');
  } else {
    contentListPages.classList.add('disabled');
  }
};

categoryMenu.onchange = () => {
  if (categoryMenu.checked) {
    contentListMenu.classList.remove('disabled');
  } else {
    contentListMenu.classList.add('disabled');
  }
};

categoryLinks.onchange = () => {
  if (categoryLinks.checked) {
    contentListLinks.classList.remove('disabled');
  } else {
    contentListLinks.classList.add('disabled');
  }
};

categoryCorps.onchange = () => {
  if (categoryCorps.checked) {
    contentListCorps.classList.remove('disabled');
  } else {
    contentListCorps.classList.add('disabled');
  }
};

categoryCommand.onchange = () => {
  if (categoryCommand.checked) {
    contentListCommand.classList.remove('disabled');
  } else {
    contentListCommand.classList.add('disabled');
  }
};

categoryCommand.onchange = () => {
  if (categoryCommand.checked) {
    contentListCommand.classList.remove('disabled');
  } else {
    contentListCommand.classList.add('disabled');
  }
};

categoryUsers.onchange = () => {
  if (categoryUsers.checked) {
    contentListUsers.classList.remove('disabled');
  } else {
    contentListUsers.classList.add('disabled');
  }
};
categoryContacts.onchange = () => {
  if (categoryContacts.checked) {
    contentListContacts.classList.remove('disabled');
  } else {
    contentListContacts.classList.add('disabled');
  }
};

document.body.onload = () => {
  if (categoryNews.checked) {
    contentListNews.classList.remove('disabled');
  }
  if (categoryPages.checked) {
    contentListPages.classList.remove('disabled');
  }
  if (categoryNews.checked) {
    contentListNews.classList.remove('disabled');
  }
  if (categoryLinks.checked) {
    contentListLinks.classList.remove('disabled');
  }
  if (categoryCorps.checked) {
    contentListCorps.classList.remove('disabled');
  }
  if (categoryCommand.checked) {
    contentListCommand.classList.remove('disabled');
  }
  if (categoryUsers.checked) {
    contentListUsers.classList.remove('disabled');
  }
  if (categoryContacts.checked) {
    contentListContacts.classList.remove('disabled');
  }
};
