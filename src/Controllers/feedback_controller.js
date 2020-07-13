"use strict";const e=require("../Models/Message"),i=require("../Models/User"),{ValidSession:r}=require("../API/Session/session"),s=require("../API/getAdminid"),n=require("../API/op_categories");async function t(t,a){const d=await i.findById(s.getId(t));if(!0===await r(t.session,d.id,a)){if(!d.operation.includes(n.MESSAGE))return a.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:`/admin/${d.id}/main`,url_text:"Повернутися до Головного Меню",user:d.id});try{const i=JSON.parse(JSON.stringify(await e.find()));let{page:r}=t.params;const s=d.settings.recordsPerPage.message,n=Math.ceil(i.length/s);(r<1||r>n)&&(r=1);const o=i.slice(s*(r-1),r*s);return a.render("main_menu_feedback",{message:o,user:d.id,pages:n,current_page:r})}catch(o){throw new Error(o)}}return null===await r(t.session,d.id,a)?a.redirect("/admin/login"):a.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:d.id})}async function a(t,a){const d=await i.findById(s.getId(t));if(!0===await r(t.session,d.id,a)){if(!d.operation.includes(n.MESSAGE))return a.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:`/admin/${d.id}/main`,url_text:"Повернутися до Головного Меню",user:d.id});try{const i=JSON.parse(JSON.stringify(await e.findById(t.params.id)));return a.render("viewMessage",{userid:d.id,email:i.email,text:i.text})}catch(o){throw new Error(o)}}return null===await r(t.session,d.id,a)?a.redirect("/admin/login"):a.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:d.id})}module.exports={getAllMessage:t,ViewMessage:a};