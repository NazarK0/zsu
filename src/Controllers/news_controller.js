"use strict";const e=require("fs"),t=require("path"),a=require("../Models/Content"),i=require("../Models/History"),n=require("../Models/SliderNames"),r=require("../Models/FileNames"),s=require("../Models/MainPhoto"),d=require("../API/getAdminid"),o=require("../API/op_categories"),u=require("../Models/User"),l=require("../API/Converter"),{ValidSession:c}=require("../API/Session/session"),p=require("../API/constants/typeNews"),_=require("../API/userAPI/hasAccess"),g=require("../API/userAPI/enabledIds");module.exports.postCancelPublicNews=async function(e,t){const a=d.getId(e),n=await u.findById(a);try{const r=await require("../API/Content/publishOperation").CancelPublish(e.params.id_news);return await new i({type_content:"Новини",operation:"Скасування публікації Новини:  ".concat(r),user:n.login}).save(),t.redirect("/admin/".concat(a,"/news/1"))}catch(r){console.error(r)}},module.exports.postPublicNews=async function(e,t){const a=d.getId(e),n=await u.findById(a);try{const r=await require("../API/Content/publishOperation").Publish(e.params.id_news);return await new i({type_content:"Новини",operation:" Публікація Новини:  ".concat(r),user:n.login}).save(),t.redirect("/admin/".concat(a,"/news-cancel/1"))}catch(r){console.error(r)}},module.exports.getAllCancelNews=async(e,t)=>{const i=await u.findById(d.getId(e));if(!0===await c(e.session,i.id,t)){if(await _(i.id,o.NEWS)){let n;const r=await g(i.id,o.NEWS);let s={page_type:"news",$or:[{public_status:"cancel"},{public_status:"deffered"}]};if(r.length){s={...{...s},_id:{$in:r}}}const u=JSON.parse(JSON.stringify(await a.find(s).select({_id:1,page_title:2,lang:3,page_subclass:4,date:5,public_status:6,keywords:7}))),c=u.map(e=>({date:require("../API/getDate").parseUTCDateFormat(e.date),time:require("../API/getDate").getTimeFromUTC(e.date)}));for(let e=0;e<u.length;e++)"cancel"===u[e].public_status&&(u[e].public_status="Скасована Новина"),"deffered"===u[e].public_status&&(u[e].public_status="Відкладена Новина"),u[e].date=c[e].date,u[e].time=c[e].time;n="system_user"===i.type;const _=[{value:p.ALL,id:"all"},{value:p.CASUAL,id:"casual"},{value:p.CURRENT,id:"curent"},{value:p.MAIN,id:"main"}];return t.render("main_cancel_news",{status:n,user:d.getId(e),news:l.getConvert(u),news_type_constant:_,current_page:1})}return t.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:"/admin/".concat(i.id,"/main"),url_text:"Повернутися до Головного Меню",user:i.id})}return null===await c(e.session,i.id,t)?t.redirect("/admin/login"):t.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:i.id})},module.exports.getAllNews=async(e,t)=>{const i=await u.findById(d.getId(e));if(!0===await c(e.session,i.id,t)){if(!(await _(i.id,o.NEWS)))return t.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:"/admin/".concat(i.id,"/main"),url_text:"Повернутися до Головного Меню",user:i.id});{const r=[{value:p.ALL,id:"all"},{value:p.CASUAL,id:"casual"},{value:p.CURRENT,id:"curent"},{value:p.MAIN,id:"main"}];try{let n;const s=await g(i.id,o.NEWS);let u={page_type:"news",public_status:"active"};if(s.length){u={...{...u},_id:{$in:s}}}const c=await a.find(u).select({_id:1,page_title:2,lang:3,page_subclass:4,date:5,keywords:6}).lean(),p=c.map(e=>({date:require("../API/getDate").parseUTCDateFormat(e.date),time:require("../API/getDate").getTimeFromUTC(e.date)}));for(let e=0;e<c.length;e++)c[e].date=p[e].date,c[e].time=p[e].time;return c.reverse(),n="system_user"===i.type,t.render("main_menu_news",{status:n,news_type_constant:r,user:d.getId(e),news:l.getConvert(c),current_page:1})}catch(n){console.error(n)}}}return null===await c(e.session,i.id,t)?t.redirect("/admin/login"):t.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:i.id})},module.exports.deleteNews=async(l,p)=>{const g=await u.findById(d.getId(l));if(!0===await c(l.session,g.id,p)){if(await _(g.id,o.NEWS)){const d=await a.findByIdAndDelete(l.params.id);try{await s.findOneAndDelete({base_url:d.content_baseUrl}),await n.deleteMany({base_url:d.content_baseUrl}),await r.deleteMany({base_url:d.content_baseUrl});const e=new i({type_content:"Новини",operation:"Видалення Новини:  ".concat(d.title),user:g.login});await e.save()}catch(w){}return e.rmdirSync(t.join(__dirname,"../..","uploads/images/".concat(d.content_folder)),{recursive:!0}),p.redirect("../1")}return p.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:"/admin/".concat(g.id,"/main"),url_text:"Повернутися до Головного Меню",user:g.id})}return null===await c(l.session,g.id,p)?p.redirect("/admin/login"):p.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:g.id})};