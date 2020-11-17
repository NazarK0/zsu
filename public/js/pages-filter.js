
document.getElementById('filter-main').addEventListener('change',()=>{
    if(document.getElementById('filter-main').value!=='Усі сторінки Бокового Меню' && 
       document.getElementById('filter-main').value!=='Усі сторінки Головного Меню'&&
       document.getElementById('filter-main').value!=='Усі сторінки'
       ){
           document.getElementById('filter-title').style ="display:none";
           document.getElementById('filter-language').style ="display:none";

       }
       else  {
        document.getElementById('filter-title').style ="display:true";
        document.getElementById('filter-language').style ="display:true";

       }

})
document.getElementById('disabled-filter').addEventListener('click',()=>{
    clearStyles();
    let options_lang= document.getElementById('filter-language').getElementsByTagName('option');
    let options_main= document.getElementById('filter-main').getElementsByTagName('option');
    document.getElementById('filter-title').value=""
    for(let i=0;i<options_lang.length;i++){
        if(options_lang[i].id==='all'){
            options_lang[i].selected=true;
           }

    }
    for(let i=0;i<options_main.length;i++){
        if(options_main[i].id==='all'){
        options_main[i].selected=true;
        }
    }


})
document.getElementById('filter-active').addEventListener('click',()=>{ 


    const options={
        menu_title:document.getElementById('filter-main').value,
        language:document.getElementById('filter-language').value,
        title:document.getElementById('filter-title').value!==""?document.getElementById('filter-title').value:null

        
    }

     let table=document.getElementById('table');
     let row=table.getElementsByTagName('tr');

     if(options.menu_title ==='Усі сторінки' 
     && options.language ==='Усі Мови'
     && options.title === null){
         clearStyles();
         return;
     }

    for(let i=0;i<row.length;i++) {
    
        let column=row[i].getElementsByTagName('td');

        if(options.menu_title==='Усі сторінки'){
            console.log('in ALL')
            for(let j=0;j<column.length;j++){
                if(column[j].id==='page-title'){
                    if(options.title===null || column[j].innerText.toUpperCase().includes(options.title.toUpperCase())){
                        row[i].style='display:true'
                    }
                    else{
                        row[i].style='display:none'
                        break;
                    }

                }
                if(column[j].id==='page-language'){
                    console.log(options.language,column[j].innerText);
                  
                    if(options.language==='Усі Мови' || column[j].innerText===options.language){
                        
                        row[i].style='display:true'
                    }
                    else{
                        row[i].style='display:none'
                        break;
                    }

                }
               
            }

         
          
        }
        if(options.menu_title==='Усі сторінки Головного Меню'){
            console.log('in MAIN')
             for(let j=0;j<column.length;j++){
                if(column[j].id==='page-title'){
                    if(options.title===null || column[j].innerText.toUpperCase().includes(options.title.toUpperCase())){
                        row[i].style='display:true'
                    }
                    else{
                        row[i].style='display:none'
                        break;
                    }

                }
                 if(column[j].id==='page-dependense-main'){
                     if(column[j].innerText==='Так'){
                         row[i].style='display:true'
                     }
                     else {
                         row[i].style='display:none'
                          break
                        };

                 }
                 if(column[j].id==='page-language'){
                     if(column[j].innerText===options.language || options.language==='Усі Мови'){
                        row[i].style='display:true'
                     }
                     else {
                         row[i].style='display:none'
                         break;
                     }
                 }

             }

        }
        if(options.menu_title==='Усі сторінки Бокового Меню'){
            console.log('in SIDE')
             for(let j=0;j<column.length;j++){
                if(column[j].id==='page-title'){
                    if(options.title===null || column[j].innerText.toUpperCase().includes(options.title.toUpperCase())){
                        row[i].style='display:true'
                    }
                    else{
                        row[i].style='display:none'
                        break;
                    }

                }
                 if(column[j].id==='page-dependense-side'){
                     if(column[j].innerText==='Так'){
                         row[i].style='display:true'
                     }
                     else {
                         row[i].style='display:none'
                          break
                        };

                 }
                 if(column[j].id==='page-language'){
                     if(column[j].innerText===options.language || options.language==='Усі Мови'){
                        row[i].style='display:true'
                     }
                     else {
                         row[i].style='display:none'
                         break;
                     }
                 }
               

             }

        }
        if(options.menu_title!=='Усі сторінки' && options.menu_title!=='Усі сторінки Головного Меню' && options.menu_title!=='Усі сторінки Бокового Меню' ){
            console.log("ELSE")

            for(let j=0;j<column.length;j++){
               
                if(column[j].id==='page-dependense-main-title'){
             
                    if(column[j].innerText!==options.menu_title){
                     
                        row[i].style='display:none'
                    }
                    else{
                      
                        row[i].style='display:true'
                        break;
                    }

                }
                if(column[j].id==='page-dependense-side-title'){
                    
                    if(column[j].innerText!==options.menu_title){
                      
                        row[i].style='display:none'
                    }
                    else{
                      
                        row[i].style='display:true'
                        break;

                    }

                }
                

            }



        }
    }

        
        
       


    



})

function clearStyles(){
    let table=document.getElementById('table');
    let row=table.getElementsByTagName('tr');
  
                 
    for(let i=0;i<row.length;i++) {
        row[i].style='display:true'
    }
            
  

}