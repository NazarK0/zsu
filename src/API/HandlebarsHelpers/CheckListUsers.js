"use strict";const c=c=>{const{list:e,selectedIds:n}=c,s=e.map(c=>{let e="";return n&&n.includes(c.id)&&(e="checked"),'\n  <label class="check">'.concat(c.login,'\n    <input type="checkbox" name="user_users" value="').concat(c._id,'" ').concat(e,'>\n    <span class="checkmark"></span>\n  </label>\n  ')});return'<ul class="check-list">\n'.concat(s.join("\n"),"\n</ul>")},e=e=>e?c(e):"<p>Список порожній</p>";module.exports=e;