const generatorPass = document.getElementById('generator-pass');
const password = document.getElementById('password');
const viewPass = document.getElementById('view-pass');

if (generatorPass) {
  generatorPass.addEventListener('click',()=>{
    password.value=gen_password(8);
    viewPass.style='display:block'
  })
}

if (password) {
  password.addEventListener('input',()=>{
    viewPass.style="display:block"   
  })
}

if (viewPass) {
  viewPass.addEventListener('click',()=>{ 
    if(password.getAttribute('type')==='password') {
      password.setAttribute('type','text');
      viewPass.innerText='Cховати Пароль'
    } else {
      password.setAttribute('type','password');
      viewPass.innerText='Показати Пароль'
    }
  });
}

function gen_password(len){
    if(len > 10) len = 10;
    len = len * (-1);
    return Math.random().toString(36).slice(len);
}