"use strict";const e=e=>e?a(e):"<p>Список порожній</p>",a=e=>{const a=e.map(e=>"<div>"+'<input id="generated-category_'.concat(e._id,'" type="radio" name="generated_category_link" value="').concat(e._id,'">')+'<label id="generated-category_'.concat(e._id,'__label" class="last-node" for="generated-category_').concat(e._id,'">').concat(e.title_ua,"</label>")+"</div>");return a.unshift('\n  <div>\n    <input type="radio" name="generated_category_link" value="no_change">\n    <label class="last-node">Залишити без змін</label>\n  </div>\n  <div>\n    <input type="radio" name="generated_category_link" value="unlink">\n    <label class="last-node">Відкріпити контент</label>\n  </div>\n  <h6 class="last-node">=Категорії=</h6>\n  '),'<ul class="categories_list" id="categories_list">\n'.concat(a.join("\n"),"\n</ul>")};module.exports=e;