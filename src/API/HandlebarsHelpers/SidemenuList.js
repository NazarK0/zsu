"use strict";const e=e=>e?i(e):"<p>Список порожній</p>",i=e=>'<ul class="side_menu_list" id="side_menu_list">\n'+e.map(e=>`<div><input id="generated-sidemenu_${e.id}" type="radio" name="generated_sidemenu_link" value="${e.id}"><label id="generated-sidemenu_${e.id}__label" for="generated-sidemenu_${e.id}">${e.title}</label></div>`).join("\n")+"\n</ul>";module.exports=e;