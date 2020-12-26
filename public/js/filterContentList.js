const contentList = document.getElementById('content-dropdown');
const filterInput = document.getElementById('content-filter');

let optionsInitial = [];

const restoreOptions = () => {
  const options = Array.from(contentList.options)

  if (optionsInitial.length === options.length) return;

  for (let index = 2; index < options.length; index++) {
    contentList.options.remove(index);
  }

  for (let index = 2; index < optionsInitial.length; index++) {
    contentList.options.add(optionsInitial[index]);
  }
};

const filterInputHandler = (event) => {
  restoreOptions();
  const filterText = event.target.value.trim();
  const options = Array.from(contentList.options);
  contentList.value = null;
  const filteredIndexes = optionsInitial
    .filter((option) => option.text.toLowerCase().includes(filterText.toLowerCase()))
    .map((option) => option.index);

  for (let index = options.length - 1; index > 1; index--) {
    if (!filteredIndexes.includes(index)) {
      contentList.options.remove(index);
    }
  }
}

document.body.onload = () => {
  if (!contentList) {
    console.warn('У даному файлі відсутній список контенту');
    return;
  }

  optionsInitial = Array.from(contentList.options);
  filterInput.oninput = filterInputHandler;
}
