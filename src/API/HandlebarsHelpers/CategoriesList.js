"use strict";const a=a=>a?e(a):"<p>Список порожній</p>",e=a=>{const{list:e,selectedId:n=null}=a,t=e.map(a=>{let e="";return n&&n===a._id.toString()&&(e="checked"),"<div>"+'<input id="category-fk-'.concat(a._id,'" type="radio" name="categoryFK" value="').concat(a._id,'" ').concat(e,">")+'<label id="category-fk-'.concat(a._id,'__label" class="last-node" for="category-fk-').concat(a._id,'">').concat(a.title_ua,"</label>")+"</div>"});return t.unshift('\n  <div>\n    <input type="radio" name="categoryFK" value="no_change">\n    <label class="last-node">Залишити без змін</label>\n  </div>\n  <div>\n    <input type="radio" name="categoryFK" value="unlink">\n    <label class="last-node">Відкріпити контент</label>\n  </div>\n  <h6 class="last-node">=Категорії=</h6>\n  '),'<ul class="categories_list" id="categories_list">\n'.concat(t.join("\n"),"\n</ul>")};module.exports=a;