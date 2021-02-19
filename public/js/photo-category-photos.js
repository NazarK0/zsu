let FORM =  document.getElementById('photo-phorm');

let photo = document.getElementById('uploads_photo');



FORM.onsubmit = async(e) =>{
    

    e.preventDefault();

    const formData = new FormData(FORM);

    const response = await fetch('/upload/media-category-photo',{
        method: 'POST',
        body:formData
    });

    SAVE_BUTTON.disabled=true;

    if (response.ok) {

        SAVE_BUTTON.disabled = true;

        const {folder,filname = null} = await response.json(); 
        

    }
}
