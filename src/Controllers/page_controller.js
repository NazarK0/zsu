"use strict";const e=require("fs"),i=require("path"),t=require("moment"),a=require("../Models/User"),n=require("../Models/Page"),r=require("../Models/Sidemenu"),d=require("../Models/Submenu"),s=require("../Models/ChildSub"),o=require("../Models/History"),u=require("../API/getAdminid"),l=require("../API/op_categories"),c=require("../API/display/page"),{ValidSession:g}=require("../API/Session/session"),p=require("../API/userAPI/hasAccess"),m=require("../API/userAPI/enabledIds"),f=require("../API/deletePagesTrash"),y=require("../API/getAllCategories"),{publishPage:w,cancelPublishPage:I}=require("../API/Content/publishOperation"),P=require("../API/isValidDate"),{first:_}=require("lodash");module.exports.getCreatePage=async(e,i)=>{const t=await a.findById(u.getId(e));if(await p(t.id,l.PAGES)){const e={mode:"add"};e.categories={list:await y("pages")};let a=await n.find({public_status:"active",isMain:!1}).select({_id:1,title:2,language:3,type:4}).lean();return a.sort((e,i)=>e.title-i.title),e.linkPages={list:a,selectedIds:[]},e.userid=t.id,i.render("wysiwygPages",e)}return i.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:"/admin/".concat(t.id,"/main"),url_text:"Повернутися до Головного Меню",user:t.id})},module.exports.postCreatedPage=async(e,i)=>{const r=await a.findById(u.getId(e));if(await p(r.id,l.PAGES)){const{title:d,description:s,type:u,keywords:c,html_body:g,language:p,publishDate:m,categoryFK:f,isMain:y,pageId:w}=e.body,I=P(m,"DD.MM.YYYY, HH:mm")?t(m).toISOString():t().toISOString(),_={type:u,description:s,title:d,keywords:c,language:p,categoryFK:f,html_body:g,isMain:!!y,publishDate:I,user_id:r.id,public_status:"deffered"};"no_change"!==f&&"unlink"!==f&&(_.categoryFK=f);let h={};h=w?await n.findByIdAndUpdate(w,_):await new n(_).save();const A=r.operation.map(e=>{const i={...e};return e.category===l.PAGES&&e.ids.length&&("string"==typeof e.ids?i.ids=[e.ids,h.id]:i.ids.push(h.id)),i});return await a.findByIdAndUpdate(r.id,{operation:A}),await new o({type_content:"Сторінка",operation:"Додавання сторінки ".concat(d),user:r.login}).save(),i.redirect("1")}return i.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:"/admin/".concat(r.id,"/main"),url_text:"Повернутися до Головного Меню",user:r.id})},module.exports.getEditPage=async(e,i)=>{const r=await a.findById(u.getId(e));if(!0===await g(e.session,r.id,i)){const{id:a}=e.params,d=await n.findById(a),s=t(d.publishDate).format("DD.MM.YYYY, HH:mm"),o={userid:r.id,title:d.title,description:d.description,keywords:d.keywords,type:d.type,html_body:d.html_body,pageId:d.id,publishDate:s,isMain:d.isMain?"checked":"",sliderCurrent:d.slider,filesCurrent:d.files,mode:"edit"};d.mainPhoto&&(o.mainPhotoCurrent="/image/".concat(d.mainPhoto,"?height=200&width=300")),o.categories={list:await y("pages"),selectedId:d.categoryFK};let u=await n.find({public_status:"active",isMain:!1}).select({_id:1,title:2,language:3,type:4}).lean();return u.sort((e,i)=>e.title-i.title),o.linkPages={list:u,selectedIds:d.links},i.render("wysiwygPages",o)}return null===await g(e.session,r.id,i)?i.redirect("/admin/login"):i.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:r.id})},module.exports.postEditedPage=async(e,i)=>{const r=await a.findById(u.getId(e));if(await p(r.id,l.PAGES)){const{id:a}=e.params,{title:d,description:s,keywords:u,html_body:l,categoryFK:c,language:g,publishDate:p,isMain:m}=e.body,f={description:s,title:d,keywords:u,language:g,publishDate:P(p,"DD.MM.YYYY, HH:mm")?t(p,"DD.MM.YYYY, HH:mm").toISOString():t().toISOString(),html_body:l,isMain:!!m,user_id:r.id};return"unlink"===c?f.categoryFK=null:"no_change"!==c&&(f.categoryFK=c),await n.findByIdAndUpdate(a,f),await new o({type_content:"Сторінка",operation:"Редагування сторінки ".concat(d),user:r.login}).save(),i.redirect("../1")}return i.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:"/admin/".concat(r.id,"/main"),url_text:"Повернутися до Головного Меню",user:r.id})},module.exports.getCanceledPages=async(e,i)=>{const t=await a.findById(u.getId(e));if(!t)return i.status(400).render("infopage",{info:"Виявлено зміну користувача, авторизуйтесь в системі",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:void 0});if(!0===await g(e.session,t.id,i)){if(await p(t.id,l.PAGES)){await f();const a=await m(t.id,l.PAGES),n=await c(a,["cancel","deffered"]);return i.render("main_canceled_page",{user:u.getId(e),contentPages:n})}return i.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:"/admin/".concat(t.id,"/main"),url_text:"Повернутися до Головного Меню",user:t.id})}},module.exports.getAllPages=async(e,i)=>{const t=await a.findById(u.getId(e));if(!t)return i.status(400).render("infopage",{info:"Виявлено зміну користувача, авторизуйтесь в системі",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:void 0});if(!0===await g(e.session,t.id,i)){if(await p(t.id,l.PAGES)){await f();const a=await m(t.id,l.PAGES),n=await c(a,"active");return i.render("main_page",{user:u.getId(e),contentPages:n})}return i.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:"/admin/".concat(t.id,"/main"),url_text:"Повернутися до Головного Меню",user:t.id})}return null===await g(e.session,t.id,i)?i.redirect("/admin/login"):i.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:t.id})},module.exports.deletePage=async(e,i)=>{const t=await a.findById(u.getId(e));if(!t)return i.status(400).render("infopage",{info:"Виявлено зміну користувача, авторизуйтесь в системі",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:void 0});if(!0===await g(e.session,t.id,i)){if(await p(t.id,l.PAGES)){const a=await n.findByIdAndDelete(e.params.id);return await new o({type_content:"Cторінки",operation:"Видалення Сторінки :  ".concat(a.title),user:t.login}).save(),i.redirect("../1")}return i.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:"/admin/".concat(t.id,"/main"),url_text:"Повернутися до Головного Меню",user:t.id})}return null===await g(e.session,t.id,i)?i.redirect("/admin/login"):i.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:t.id})},module.exports.postCancelPublicPage=async(e,i)=>{const t=u.getId(e),{id:a}=e.params;return await I(a),i.redirect("/admin/".concat(t,"/pages/1"))},module.exports.postPublicPage=async(e,i)=>{const t=u.getId(e),{id:a}=e.params;return await w(a),i.redirect("/admin/".concat(t,"/pages/cancel-publish/1"))};const h=async(e,i)=>{null!==e&&await r.findByIdAndUpdate(e,{content_id:null}),null!==i&&(await d.findByIdAndUpdate(i,{content_id:null}),await s.findByIdAndUpdate(i,{content_id:null}))};