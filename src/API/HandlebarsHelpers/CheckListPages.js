"use strict";const e=e=>{const{list:s,selectedIds:t}=e;return`<ul class="check-list">\n${s.map(e=>{let s="";return t&&t.includes(e._id.toString())&&(s="checked"),`\n<label class="check">${e.title} (${e.language})\n  <input type="checkbox" name="user_pages" value="${e._id}" data-type="${e.type}" ${s}>\n  <span class="checkmark"></span>\n</label>`}).join("\n")}\n</ul>`},s=s=>s?e(s):"<p>Список порожній</p>";module.exports=s;