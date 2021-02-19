const newsId = document.getElementById('news-id');
const linksForm = document.getElementById('links-form');

linksForm.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(linksForm);
  formData.set('contentId', newsId.value);
  formData.set('contentType', 'page');

  const response = await fetch('/content/links/save', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const { contentId: id } = await response.json();
    alert('Посилання збережено!');

    if (id) {
      newsId.value = id;
    }
  }
};
