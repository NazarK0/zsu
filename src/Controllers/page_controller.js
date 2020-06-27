"use strict";const e=require("fs"),i=require("path"),n=require("../Models/User"),r=require("../Models/Content"),t=require("../Models/Sidemenu"),a=require("../Models/MainPhoto"),s=require("../Models/SliderNames"),d=require("../Models/FileNames"),l=require("../Models/Submenu"),o=require("../Models/ChildSub"),u=require("../Models/History"),c=require("../API/getAdminid"),g=require("../API/op_categories"),{getAllPage:p}=require("../../src/API/PageApi/page"),{ValidSession:_}=require("../API/Session/session");async function m(e,i){null!==e&&await t.findByIdAndUpdate(e,{content_id:null}),null!==i&&(await l.findByIdAndUpdate(i,{content_id:null}),await o.findByIdAndUpdate(i,{content_id:null}))}module.exports.getAllPages=async(e,i)=>{const r=await n.findById(c.getId(e));if(!0===await _(e.session,r.id,i)){if(r.operation.includes(g.PAGES)){const n=await p();n.reverse();let{page:t}=e.params;const a=r.settings.recordsPerPage.pages,s=Math.ceil(n.length/a);(t<1||t>s)&&(t=1);const d=n.slice(a*(t-1),t*a);return i.render("main_page",{user:c.getId(e),contentPages:d,pages:s,current_page:t})}return i.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:`/admin/${r.id}/main`,url_text:"Повернутися до Головного Меню",user:r.id})}return null===await _(e.session,r.id,i)?i.redirect("/admin/login"):i.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:r.id})},module.exports.deletePage=async(t,l)=>{const o=await n.findById(c.getId(t));if(!0===await _(t.session,o.id,l)){if(o.operation.includes(g.PAGES)){const n=await r.findByIdAndDelete(t.params.id),{generated_sidemenu_link:c,generated_menu_link:g}=n;try{await a.findOneAndDelete({base_url:n.content_baseUrl}),await s.deleteMany({base_url:n.content_baseUrl}),await d.deleteMany({base_url:n.content_baseUrl}),e.rmdirSync(i.join(__dirname,"../..","uploads/images/"+n.content_folder),{recursive:!0}),await m(c,g);new u({type_content:"Cторінки",operation:"Видалення Сторінки :  "+n.title,user:o.login})}catch(p){console.log(p)}return l.redirect("../1")}return l.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:`/admin/${o.id}/main`,url_text:"Повернутися до Головного Меню",user:o.id})}return null===await _(t.session,o.id,l)?l.redirect("/admin/login"):l.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:o.id})};