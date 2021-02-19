//view-photo-btn Огляд 
//send-photo-submit Зберегти


const VIEW_BUTTON = document.getElementById('view-photo-btn');
const SAVE_BUTTON = document.getElementById('send-photo-submit');
const PHOTO_INTPUT = document.getElementById('photo-input');
const ADD_PHOTO_FORM = document.getElementById('send-photo_form');


VIEW_BUTTON.onclick=()=>{

    PHOTO_INTPUT.click();
    
  
}

PHOTO_INTPUT.oninput = () => {
  
    SAVE_BUTTON.disabled = false;
}



ADD_PHOTO_FORM.onsubmit = async(e) =>{
    

    e.preventDefault();

    const formData = new FormData(ADD_PHOTO_FORM);

    const response = await fetch('/upload/category-photo',{
        method: 'POST',
        body:formData
    });

    SAVE_BUTTON.disabled=true;

    if (response.ok) {

        SAVE_BUTTON.disabled = true;

        const {folder,filname = null} = await response.json(); 
        

    }
}

