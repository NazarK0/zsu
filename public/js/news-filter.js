

// function formatDate(date) {
//   if(date===""){
//       return null
//   }
//     let datearray= date.split('-');
//     datearray[0]=datearray[0];
  
//     return datearray[2] + '-' + datearray[1] + '-' + datearray[0]
//   }

const instance = new dtsel.DTS('input#filter-date', {
  direction: 'TOP',
  dateFormat: 'dd.mm.yyyy',
  showTime: false,
});

document.getElementById('filter-active').addEventListener('click',()=>{

    let options={
        date: document.getElementById('filter-date').value,
        typeNews:document.getElementById('filter-news-parameter').value?document.getElementById('filter-news-parameter').value:null,
        lang:document.getElementById('filter-language').value?document.getElementById('filter-language').value:null,
        title:(document.getElementById('filter-title').value!=="")?document.getElementById('filter-title').value.toUpperCase():null,
        // status:document.getElementById('filter-status').value
    }

    if(options.date===null & options.typeNews==="Усі Типи" & options.lang==="Усі Мови"){
        let tableoptions=document.getElementById('table');
        let row=tableoptions.getElementsByTagName('tr')
        for(let i=0;i<row.length;i++){
            row[i].style='display:' 
        }
    }

    let tableoptions=document.getElementById('table');
    let row=tableoptions.getElementsByTagName('tr')

    console.log(options.date);

    for(let i=0;i<row.length;i++){
        let column=row[i].getElementsByTagName('td');
        for(let j=0;j<column.length;j++){

            if(column[j].id ==='news-type'){
                if(options.typeNews!=='Усі Типи' && column[j].innerText!==options.typeNews){
                    row[i].style='display:none'
                    break;
                }
                if(options.typeNews!=='Усі Типи'|| options.typeNews==='Усі Типи' && column[j].innerText===options.typeNews ){
                    row[i].style='display: true '
                }
                if(options.typeNews ==='Усі Мови'){
                    row[i].style='display: true '
                }
            }
            if(column[j].id === 'lang-type'){
                if(options.lang !== 'Усі Мови' && column[j].innerText !== options.lang){
                    row[i].style='display:none'
                    break;
                }
                if(options.lang!=='Усі Мови' || options.typeNews==='Усі Мови' && column[j].innerText===options.lang ){
                    row[i].style='display: true '
                }
                if(options.lang==='Усі Мови'){
                    row[i].style='display: true '
                }
            }
            if(column[j].id === 'date'){  

                if(options.date !== null && !column[j].innerText.includes(options.date)){

                    row[i].style='display:none'
                    break;
                }
                if(options.date!==null &&  column[j].innerText.includes(options.date) ){

                    row[i].style='display:true'
                }
                if(options.date===null){

                    row[i].style='display: true '
                }
            }
            if(column[j].id==='news-title'){

                if(options.title===null){
                    
                    row[i].style='display: true '
                }
                
                if(options.title!==null && !column[j].innerText.toUpperCase().includes(options.title.toUpperCase())){
                    row[i].style='display:none'
                    break;
                }
                if(options.title!==null && column[j].innerText.toUpperCase().includes(options.title.toUpperCase())){
                    row[i].style='display: true '
                }

              
            }
            // if(column[j].id==='status'){

            //     if(options.status!=="Усі Статуси"){

            //         console.log(column[j].innerText.length);
            //         console.log("Cкасована Новина".length)
            //         console.log(column[j].innerText==="Cкасована Новина",options.status==="Скасовані Новини");
            //         if(options.status==="Скасовані Новини" && column[j].innerText==="Cкасована Новина"){
            //             row[i].style='display:true'
                       
            //         }
            //         if(options.status==="Відкладені Новини" && column[j].innerText==="Відкладена Новина"){
            //             row[i].style='display:true'
                      

            //         }
            //         else{
            //             row[i].style='display:none'
                     
            //         }
                    
            //     }
            //     else{
            //         row[i].style='display true'
            //     }

            // }
        }
    }

  
})
document.getElementById('disabled-filter').addEventListener('click',()=>{
    let tableoptions=document.getElementById('table');
    let row=tableoptions.getElementsByTagName('tr')
    for(let i=0;i<row.length;i++){
        row[i].style='display:' 
    }
   let options_lang= document.getElementById('filter-language').getElementsByTagName('option');
   let options_news_type=document.getElementById('filter-news-parameter').getElementsByTagName('option');
   document.getElementById('filter-date').value="";
   document.getElementById('filter-title').value=""

   for(let i=0;i<options_lang.length;i++){
       if(options_lang[i].id==='all'){
        options_lang[i].selected=true;
       }
   }
   
   for(let i=0;i<options_news_type.length;i++){
    if(options_news_type[i].id==='all'){
    options_news_type[i].selected=true;
    }
}

    


})