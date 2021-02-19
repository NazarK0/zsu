const noChangeRadio = document.getElementById('link-type-no-change');
const noLinkRadio = document.getElementById('link-type-no-link');
const directLinkRadio = document.getElementById('link-type-direct-link');
const contentRadio = document.getElementById('link-type-content');
const directLinkUAInput = document.getElementById('url_ua');
const directLinkENInput = document.getElementById('url_en');
const contentPageLinkUA = document.getElementById('content-dropdown-ua');
const contentPageLinkEN = document.getElementById('content-dropdown-en');
const linkType = Array.from(document.getElementsByName('linkType'));
const hasContentPageLinksUa = !!contentPageLinkUA;
const hasContentPageLinksEn = !!contentPageLinkEN;
const directLinkRadioChecked = directLinkRadio.checked;
const contentRadioChecked = contentRadio.checked;

const disableContentPageLinks = (value) => {
  if (hasContentPageLinksUa) {
    contentPageLinkUA.disabled = value;
  }

  if (hasContentPageLinksEn) {
    contentPageLinkEN.disabled = value;
  }
};

const disableDirectLinks = (value) => {
  directLinkUAInput.disabled = value;
  directLinkENInput.disabled = value;
}

if (directLinkRadioChecked) {
  disableContentPageLinks(true);
  disableDirectLinks(false);
}

if (contentRadioChecked) {
  disableContentPageLinks(false);
  disableDirectLinks(true);
}

if ((noChangeRadio && noChangeRadio.checked) || noLinkRadio.checked) {
  disableContentPageLinks(true);
  disableDirectLinks(true);
}

linkType.forEach((radio) => {
  radio.onchange = (event) => {
    const { value } = event.target;
    switch (value) {
      case 'noChange':
      case 'noLink':
        disableContentPageLinks(true);
        disableDirectLinks(true);
        break;
      case 'directLink':
        disableContentPageLinks(true);
        disableDirectLinks(false);
        break;
      case 'content':
        disableContentPageLinks(false);
        disableDirectLinks(true);
        break;
      default:
        break;
    }
  };
});
