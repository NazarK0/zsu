"use strict";const e=require("lodash"),i=require("../Models/Main_Menu"),n=require("../Models/Submenu"),t=require("../Models/Content"),a=require("../Models/ChildSub"),r=require("../Models/User"),d=require("../Models/History"),s=require("../API/getAdminid"),o=require("../API/op_categories"),u=require("../API/Converter"),l="./error_pages/",{ValidSession:m}=require("../API/Session/session");module.exports.getMainMenu=async(e,n)=>{const t=await r.findById(s.getId(e));if(console.log(t),!0===await m(e.session,t.id,n)){if(!t.operation.includes(o.MAIN_MENU))return n.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:`/admin/${t.id}/main`,url_text:"Повернутися до Головного Меню",user:t.id});try{const t=await i.find();return n.render("main_menu",{user:s.getId(e),main:await u.getConvert(t)})}catch(a){console.error(a)}}return null===await m(e.session,t.id,n)?n.redirect("/admin/login"):n.status(400).render("infopage",{info:"Данний користувач авторизований в системі , використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:t.id})},module.exports.getEditMainMenuItem=async(e,n)=>{const t=await r.findById(s.getId(e));if(!0===await m(e.session,t.id,n)&&t.operation.includes(o.MAIN_MENU)){const{idmenu:r}=e.params,d=await i.findById(r),{title:s,lang:o,_id:u}=d;try{return n.status(200).render("edit_mainmenu",{user:t.id,action_type:"edit/"+u,title:s,lang:o,id:u,parameter:"visible"})}catch(a){console.error(a)}}return null===await m(e.session,t.id,n)?n.redirect("/admin/login"):n.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:t.id})},module.exports.postEditedMainMenuItem=async(e,n)=>{const t=await r.findById(s.getId(e));if(!0===await m(e.session,t.id,n)){if(!t.operation.includes(o.MAIN_MENU))return n.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:`/admin/${t.id}/main`,url_text:"Повернутися до Головного Меню",user:t.id});{const{title:r,lang:o}=e.body,u=await i.findById(e.params.idmenu);try{await i.findByIdAndUpdate(e.params.idmenu,{title:r,lang:o,user_id:s.getId(e)});const a=new d({type_content:"Головне меню",operation:"Редагування пункту головного меню "+u.title,user:t.login});return await a.save(),n.status(200).redirect(`/admin/${t.id}/mainmenu`)}catch(a){console.error(a)}}}return null===await m(e.session,t.id,n)?n.redirect("/admin/login"):n.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:t.id})},module.exports.deleteMainMenuItem=async(u,l)=>{const c=await r.findById(s.getId(u));if(!0===await m(u.session,c.id,l)){if(!c.operation.includes(o.MAIN_MENU))return l.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:`/admin/${c.id}/main`,url_text:"Повернутися до Головного Меню",user:c.id});{const{idmenu:r}=u.params,s=await i.findById(r);try{const o=await i.findByIdAndDelete(r),u=await n.find({parent_main:o.id}).select({_id:1});let m=[];for(let e=0;e<u.length;e++)m.push(await a.find({parent_sub:u[e].id}).select({_id:1}));m=e.flattenDeep(m);let g=[];for(let e=0;e<m.length;e++)g.push(await a.find({parent_sub:m[e].id}).select({_id:1}));g=e.flattenDeep(g);let f=[];for(let e=0;e<g.length;e++)f.push(await a.find({parent_sub:g[e].id}).select({_id:1}));f=e.flattenDeep(f);const p=e.concat(m,g,f);for(let e=0;e<p.length;e++)await a.findByIdAndDelete(p[e].id),await t.findOneAndUpdate({generated_menu_link:p[e]},{generated_menu_link:null});for(let e=0;e<u.length;e++)await n.findByIdAndDelete(u[e].id),await t.findOneAndUpdate({generated_menu_link:u[e]},{generated_menu_link:null});const _=new d({type_content:"Головне меню",operation:"Видалення пункту головного меню "+s.title,user:c.login});return await _.save(),l.status(200).redirect(`/admin/${c.id}/mainmenu`)}catch(g){console.error(g)}}}return null===await m(u.session,c.id,l)?l.redirect("/admin/login"):l.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:c.id})},module.exports.getAddMainMenuItem=async(e,i)=>{const n=await r.findById(s.getId(e));return!0===await m(e.session,n.id,i)?n.operation.includes(o.MAIN_MENU)?i.status(200).render("edit_mainmenu",{user:n.id,action_type:"add",parameter:"hidden"}):i.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:`/admin/${n.id}/main`,url_text:"Повернутися до Головного Меню",user:n.id}):null===await m(e.session,n.id,i)?i.redirect("/admin/login"):i.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:n.id})},module.exports.postAddedMainMenuItem=async(e,n)=>{const t=await r.findById(s.getId(e));if(!0===await m(e.session,t.id,n)){if(!t.operation.includes(o.MAIN_MENU))return n.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:`/admin/${t.id}/main`,url_text:"Повернутися до Головного Меню",user:t.id});{const{title:r,lang:o}=e.body,u=new i({title:r,lang:o,submenu_item:[],user_id:s.getId(e)});try{await u.save();const e=new d({type_content:"Головне меню",operation:"Додавання пункту головного меню "+u.title,user:t.login});return await e.save(),n.redirect(`/admin/${t.id}/mainmenu`)}catch(a){console.error(a)}}}return null===await m(e.session,t.id,n)?n.redirect("/admin/login"):n.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:t.id})},module.exports.getMainPage=async(e,i)=>{const n=await r.findById(s.getId(e));return!0===await m(e.session,n.id,i)?i.render("start_main_menu",{user:n.id,nameuser:n.login}):null===await m(e.session,n.id,i)?i.redirect("/admin/login"):i.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:n.id})};