const contentListEn = document.getElementById('content-dropdown-en');
const filterInputEn = document.getElementById('content-filter-en');

let optionsInitialEn = [];

const restoreOptionsEn = () => {
  const options = Array.from(contentListEn.options)

  if (optionsInitialEn.length === options.length) return;

  for (let index = 1; index < options.length; index++) {
    contentListEn.options.remove(index);
  }

  for (let index = 1; index < optionsInitialEn.length; index++) {
    contentListEn.options.add(optionsInitialEn[index]);
  }
};

const filterInputHandlerEn = (event) => {
  restoreOptionsEn();
  const filterText = event.target.value.trim();
  const options = Array.from(contentListEn.options);
  contentListEn.value = null;
  const filteredIndexes = optionsInitialEn
    .filter((option) => option.text.toLowerCase().includes(filterText.toLowerCase()))
    .map((option) => option.index);

  for (let index = options.length - 1; index > 0; index--) {
    if (!filteredIndexes.includes(index)) {
      contentListEn.options.remove(index);
    }
  }
};

if (contentListEn) {
  optionsInitialEn = Array.from(contentListEn.options);
  filterInputEn.oninput = filterInputHandlerEn;
}
