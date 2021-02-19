const instance = new dtsel.DTS('input#filter-date', {
  direction: 'TOP',
  dateFormat: 'dd.mm.yyyy',
  showTime: false,
});

// function formatDate(date) {
//     if(date===""){
//         return null
//     }
//       let datearray= date.split('-');
//       datearray[0]=datearray[0]%100;
    
//       return datearray[2] + '-' + datearray[1] + '-' + datearray[0]
//     }
  


document.getElementById('filter-button').addEventListener('click',()=>{
   let date_value= document.getElementById('filter-date').value;
   let date_operation_type =document.getElementById('filter-operation').value
   let date_user=document.getElementById('filter-users').value
   let date_operation_Info=document.getElementById('search-operation').value;
    console.log(date_operation_Info);
    const filter_option={
        date:date_value,
        operation_type:date_operation_type!=="Всі типи операцій"?date_operation_type:null,
        user:date_user!=="Всі користувачі"?date_user:null,
        operationInfo:date_operation_Info!==""?date_operation_Info:null
    }

    console.log(filter_option);

    if(filter_option.date===null && filter_option.operation_type===null && filter_option.user===null && filter_option.operationInfo===""){
       clearStyle();
    }
    else{
        let row= getRowTable();
        for(let i=0;i<row.length;i++){
            let column=row[i].getElementsByTagName('td');
            for(let j=0;j<column.length;j++){
                if(column[j].id==='type-operation'){
                        if(filter_option.operationInfo!==null && column[j].innerText.toUpperCase().includes(filter_option.operationInfo.toUpperCase())!==true){
                            row[i].style='display:none';
                            break;
    
                        }
                        else {
                            row[i].style='display:true'
                        }
        
                }
                if(column[j].id==='type-content'){
                    if(filter_option.operation_type!==null && column[j].innerText!==filter_option.operation_type ){
                       row[i].style='display:none' 
                        break;
                    }
                    else{
                        row[i].style='display:true'
                    }
    
                }
                if(column[j].id==='user'){
                    if(filter_option.user!==null && column[j].innerText!==filter_option.user){
                        row[i].style='display:none'
                        break;
                    }
                    else{
                        row[i].style='display:true'
                    }
    
                }
                if(column[j].id==='date'){
                    if(filter_option.date!==null && column[j].innerText!==filter_option.date){
                        row[i].style='display:none'
                        break;
                    }
                    else{
                        row[i].style='display:true'
                    }
    
    
                }
              
    
            }
        }

    }
    
   
 






})
document.getElementById('disabled-filter-button').addEventListener('click',()=>{

let row=getRowTable();
for(let i=0;i<row.length;i++){
    row[i].style='display:true'
}
let options_user= document.getElementById('filter-users').getElementsByTagName('option');
let options_operation=document.getElementById('filter-operation').getElementsByTagName('option');
document.getElementById('filter-date').value="yyyy-MM-dd";

for(let i=0;i<options_user.length;i++){
    if(options_user[i].id==='all'){
        options_user[i].selected=true;
    }

}
for(let i=0;i<options_operation.length;i++){
    if(options_operation[i].id==='all'){
        options_operation[i].selected=true
    }
}


})

function clearStyle(){
    let tableoption=document.getElementById('table');
    let row=tableoption.getElementsByTagName('tr');
    for(let i=0;i<row.length;i++){
        row[i].style="display:true"
    }
}
function getRowTable(){
    let tableoptions=document.getElementById('table');
    return tableoptions.getElementsByTagName('tr');

}