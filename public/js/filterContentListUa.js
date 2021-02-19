const contentListUa = document.getElementById('content-dropdown-ua');
const filterInputUa = document.getElementById('content-filter-ua');

let optionsInitialUa = [];

const restoreOptionsUa = () => {
  const options = Array.from(contentListUa.options)

  if (optionsInitialUa.length === options.length) return;

  for (let index = 1; index < options.length; index++) {
    contentListUa.options.remove(index);
  }

  for (let index = 1; index < optionsInitialUa.length; index++) {
    contentListUa.options.add(optionsInitialUa[index]);
  }
};

const filterInputHandlerUa = (event) => {
  restoreOptionsUa();
  const filterText = event.target.value.trim();
  const options = Array.from(contentListUa.options);
  contentListUa.value = null;
  const filteredIndexes = optionsInitialUa
    .filter((option) => option.text.toLowerCase().includes(filterText.toLowerCase()))
    .map((option) => option.index);

  for (let index = options.length - 1; index > 0; index--) {
    if (!filteredIndexes.includes(index)) {
      contentListUa.options.remove(index);
    }
  }
};

if (contentListUa) {
  optionsInitialUa = Array.from(contentListUa.options);
  filterInputUa.oninput = filterInputHandlerUa;
}
