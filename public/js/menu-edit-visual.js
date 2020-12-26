const noChangeRadio = document.getElementById('link-type-no-change');
const noLinkRadio = document.getElementById('link-type-no-link');
const directLinkRadio = document.getElementById('link-type-direct-link');
const contentRadio = document.getElementById('link-type-content');
const directLink = document.getElementById('selectlink-dropdown');
const contentPageLink = document.getElementById('content-dropdown-');
const linkType = Array.from(document.getElementsByName('linkType'));
const hasContentPageLink = !!contentPageLink;
const hasDirectLink = !!directLink;
const directLinkRadioChecked = directLinkRadio.checked;
const contentRadioChecked = contentRadio.checked;

const disableContentPageLink = (value) => {
  if (hasContentPageLink) {
    contentPageLink.disabled = value;
  }
};

const disableDirectLink = (value) => {
  if (hasDirectLink) {
    directLink.disabled = value;
  }
};

if (directLinkRadioChecked) {
  disableContentPageLink(true);
  disableDirectLink(false);
}

if (contentRadioChecked) {
  disableContentPageLink(false);
  disableDirectLink(true);
}

if ((noChangeRadio && noChangeRadio.checked) || noLinkRadio.checked) {
  disableContentPageLink(true);
  disableDirectLink(true);
}

linkType.forEach((radio) => {
  radio.onchange = (event) => {
    const { value } = event.target;
    switch (value) {
      case 'noChange':
      case 'noLink':
        disableContentPageLink(true);
        disableDirectLink(true);
        break;
      case 'directLink':
        disableContentPageLink(true);
        disableDirectLink(false);
        break;
      case 'content':
        disableContentPageLink(false);
        disableDirectLink(true);
        break;
      default:
        break;
    }
  };
});
