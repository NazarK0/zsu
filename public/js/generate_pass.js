document.getElementById('generator-pass').addEventListener('click',()=>{
    document.getElementById('password').value=gen_password(8);
    document.getElementById('view-pass').style='display:block'
})
document.getElementById('password').addEventListener('input',()=>{
    document.getElementById('view-pass').style="display:block"   
})
document.getElementById('view-pass').addEventListener('click',()=>{ 
    
   if( document.getElementById('password').getAttribute('type')==='password'){
    document.getElementById('password').setAttribute('type','text');
    document.getElementById('view-pass').innerText='Cховати Пароль'

   }
   else{
    document.getElementById('password').setAttribute('type','password');
    document.getElementById('view-pass').innerText='Показати Пароль'
   }
   
})
function gen_password(len){
    if(len > 10) len = 10;
    len = len * (-1);
    return Math.random().toString(36).slice(len);
}