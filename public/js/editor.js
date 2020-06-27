function showHideNewsTypes({ value }) {
  switch (value) {
    case "content_page":
      document.getElementById("news_controls-group").style.display = "none";
      document.getElementById("content-page_controls-group").style.display = "inline-block";
      break;
    case "news":
      document.getElementById("news_controls-group").style.display = "inline-block";
      document.getElementById("content-page_controls-group").style.display = "none";
      break;
    default:
      document.getElementById("news_controls-group").style.display = "none";
      document.getElementById("content-page_controls-group").style.display = "none";
  }
  document.getElementById("news-type-casual").required = value === "news";
  document.getElementById("news-type-current").required = value === "news";
  document.getElementById("news-type-main").required = value === "news";
}

function showHideLinkToMainMenu({ checked }) {
  document.getElementById("tree_view-main_menu").style.display = checked ? "block" : "none";
}

function showHideLinkToSideMenu({ checked }) {
  document.getElementById("side_menu_list").style.display = checked ? "block" : "none";
}

//Main Menu Tree-View
let toggler = document.getElementsByClassName("caret");

for (let i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function () {
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
  });
}
