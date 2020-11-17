tinymce.init({
  selector: "#html_body",
  language: "uk",

  menubar: "edit insert format table uploadMenu",
  contextmenu: "edit insert format",
  toolbar:
    "undo redo |" +
    " bold italic underline strikethrough |" +
    " fontselect fontsizeselect ||" +
    "alignleft aligncenter alignright alignjustify | " +
    " forecolor backcolor removeformat |" +
    " bullist numlist | outdent indent | " +
    " ltr rtl | charmap",
  plugins: [
    "lists link image paste save visualchars charmap",
    "imagetools table anchor emoticons hr",
    "insertdatetime media searchreplace wordcount",
  ],
  image_title: true,
  automatic_uploads: true,
  file_picker_types: "image",
  file_picker_callback: function (cb, value, meta) {
    var input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    /*
      Note: In modern browsers input[type="file"] is functional without
      even adding it to the DOM, but that might not be the case in some older
      or quirky browsers like IE, so you might want to add it to the DOM
      just in case, and visually hide it. And do not forget do remove it
      once you do not need it anymore.
    */

    input.onchange = function () {
      var file = this.files[0];

      var reader = new FileReader();
      reader.onload = function () {
        /*
          Note: Now we need to register the blob in TinyMCEs image blob
          registry. In the next release this part hopefully won't be
          necessary, as we are looking to handle it internally.
        */
        var id = "blobid" + new Date().getTime();
        var blobCache = tinymce.activeEditor.editorUpload.blobCache;
        var base64 = reader.result.split(",")[1];
        var blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);

        /* call the callback and populate the Title field with the file name */
        cb(blobInfo.blobUri(), { title: file.name });
      };
      reader.readAsDataURL(file);
    };

    input.click();
  },

  toolbar_mode: "sliding",
  branding: false,
  elementpath: false,
  custom_ui_selector: ".tiny-submit-button",
  height: "80vh",
  width: "65vw",
  marginRight: "30px",
  style_formats: [
    {
      title: "Заголовки",
      items: [
        { title: "Заголовок 1", format: "h1" },
        { title: "Заголовок 2", format: "h2" },
        { title: "Заголовок 3", format: "h3" },
        { title: "Заголовок 4", format: "h4" },
        { title: "Заголовок 5", format: "h5" },
        { title: "Заголовок 6", format: "h6" },
      ],
    },
    {
      title: "Вбудовані об'єкти",
      items: [
        { title: "Текст", inline: "span" },
        { title: "Абревіатура", inline: "abbr" },
        { title: "Акронім", inline: "acronym" },
        { title: "Термін", inline: "dfn" },
        { title: "Жирний", format: "bold" },
        { title: "Курсив", format: "italic" },
        { title: "Підкреслений", format: "underline" },
        { title: "Закреслений", format: "strikethrough" },
        { title: "Верхній індекс", format: "superscript" },
        { title: "Нижній індекс", format: "subscript" },
      ],
    },
    {
      title: "Блоки",
      items: [
        { title: "Параграф", format: "p" },
        { title: "Цитата", format: "blockquote" },
        { title: "Блок", format: "div" },
      ],
    },
    {
      title: "Вирівнювання",
      items: [
        { title: "По лівому краю", format: "alignleft" },
        { title: "По центру", format: "aligncenter" },
        { title: "По правому краю", format: "alignright" },
        { title: "Розтягнути", format: "alignjustify" },
      ],
    },
  ],
  style_formats_autohide: true,
});
