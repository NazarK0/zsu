"use strict";const e=require("lodash"),n=require("../Models/Main_Menu"),t=require("../Models/Submenu"),i=require("../Models/Page"),a=require("../Models/ChildSub"),d=require("../Models/User"),r=require("../Models/History"),s=require("../API/getAdminid"),l=require("../API/op_categories"),u=require("../API/Converter"),{ValidSession:o}=require("../API/Session/session"),c=require("../API/userAPI/hasAccess"),m=require("../API/userAPI/enabledIds"),g=require("../Models/Link");module.exports.getMainMenu=async(e,t)=>{const i=await d.findById(s.getId(e));if(!0===await o(e.session,i.id,t)){if(!(await c(i.id,l.MAIN_MENU)))return t.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:"/admin/".concat(i.id,"/main"),url_text:"Повернутися до Головного Меню",user:i.id});{const{lang:i}=e.params;try{const a=await n.find({lang:i});a.sort((e,n)=>e.number-n.number);const d="ua"===i?"en":"ua";return t.render("main_menu",{user:s.getId(e),langCurrent:i,langOther:d,main:await u.getConvert(a)})}catch(a){console.error(a)}}}return null===await o(e.session,i.id,t)?t.redirect("/admin/login"):t.status(400).render("infopage",{info:"Данний користувач авторизований в системі , використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:i.id})},module.exports.getEditMainMenuItem=async(e,t)=>{const a=await d.findById(s.getId(e));if(!0===await o(e.session,a.id,t)&&await c(a.id,l.MAIN_MENU)){const{language:d,idmenu:s}=e.params,l=await n.findById(s),u=await g.find().lean(),o=await i.find({public_status:"active",language:d,isMain:!0,bindedToMenu:!1}).select({_id:1,title:2}).lean(),{title:c,_id:m,content_id:f}=l;let _="";const w=await i.findById(f).select({_id:0,title:1}).lean();_=w?w.title:"";try{return t.status(200).render("edit_mainmenu",{user:a.id,mode:"edit",title:c,language:d,id:m,link_list:u,type:2,pagesList:o,currentContent:_})}catch(r){console.error(r)}}return null===await o(e.session,a.id,t)?t.redirect("/admin/login"):t.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:a.id})},module.exports.postEditedMainMenuItem=async(e,t)=>{const a=await d.findById(s.getId(e));if(!0===await o(e.session,a.id,t)){if(!(await c(a.id,l.MAIN_MENU)))return t.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:"/admin/".concat(a.id,"/main"),url_text:"Повернутися до Головного Меню",user:a.id});{const{title:d,content__id:l,link_id:o}=e.body,{language:c,idmenu:m}=e.params,g={title:d,lang:c,link:"null"!==o?o:null,user_id:s.getId(e)},f=await n.findById(m).select({_id:0,content_id:1}).lean();"unlink"===l?(g.content_id=null,f.content_id&&await i.findByIdAndUpdate(f.content_id,{bindedToMenu:!1})):l&&"null"!==l&&"unlink"!==l&&(g.content_id=l,await i.findByIdAndUpdate(l,{bindedToMenu:!0}));try{const e=await n.findByIdAndUpdate(m,g);return await new r({type_content:"Головне меню",operation:"Редагування пункту головного меню ".concat(e.title),user:a.login}).save(),t.status(200).redirect("/admin/".concat(a.id,"/mainmenu/lang/").concat(e.lang))}catch(u){console.error(u)}}}return null===await o(e.session,a.id,t)?t.redirect("/admin/login"):t.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:a.id})},module.exports.deleteMainMenuItem=async(u,m)=>{const g=await d.findById(s.getId(u));if(!0===await o(u.session,g.id,m)){if(!(await c(g.id,l.MAIN_MENU)))return m.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:"/admin/".concat(g.id,"/main"),url_text:"Повернутися до Головного Меню",user:g.id});{const{idmenu:d}=u.params,s=await n.findById(d);try{const l=await n.findByIdAndDelete(d),u=await n.find().where({lang:l.lang}).sort({number:1}).lean();for(let e=0;e<u.length;e++)await n.findByIdAndUpdate({_id:u[e]._id},{$set:{number:e+1}});const o=await t.find({parent_main:l.id}).select({_id:1});let c=[];for(let e=0;e<o.length;e++)c.push(await a.find({parent_sub:o[e].id}).select({_id:1}));c=e.flattenDeep(c);let f=[];for(let e=0;e<c.length;e++)f.push(await a.find({parent_sub:c[e].id}).select({_id:1}));f=e.flattenDeep(f);let _=[];for(let e=0;e<f.length;e++)_.push(await a.find({parent_sub:f[e].id}).select({_id:1}));_=e.flattenDeep(_);const w=e.concat(c,f,_);for(let e=0;e<w.length;e++)await a.findByIdAndDelete(w[e].id),await i.findOneAndUpdate({generated_menu_link:w[e]},{generated_menu_link:null});for(let e=0;e<o.length;e++)await t.findByIdAndDelete(o[e].id),await i.findOneAndUpdate({generated_menu_link:o[e]},{generated_menu_link:null});const p=new r({type_content:"Головне меню",operation:"Видалення пункту головного меню ".concat(s.title),user:g.login});return await p.save(),m.status(200).redirect("/admin/".concat(g.id,"/mainmenu/lang/").concat(l.lang))}catch(f){console.error(f)}}}return null===await o(u.session,g.id,m)?m.redirect("/admin/login"):m.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:g.id})},module.exports.getAddMainMenuItem=async(e,n)=>{const t=await d.findById(s.getId(e)),a=await g.find().lean();if(!0===await o(e.session,t.id,n)){if(await c(t.id,l.MAIN_MENU)){const{language:d}=e.params,r=await i.find({public_status:"active",isMain:!0,language:d,bindedToMenu:!1}).select({_id:1,title:2});return n.status(200).render("edit_mainmenu",{user:t.id,mode:"add",language:d,type:1,pagesList:r,link_list:a})}return n.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:"/admin/".concat(t.id,"/main"),url_text:"Повернутися до Головного Меню",user:t.id})}return null===await o(e.session,t.id,n)?n.redirect("/admin/login"):n.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:t.id})},module.exports.postAddedMainMenuItem=async(e,u)=>{const m=await d.findById(s.getId(e));if(!0===await o(e.session,m.id,u)){if(await c(m.id,l.MAIN_MENU)){const{title:d,content__id:l,link_id:o}=e.body,{language:c}=e.params,g=(await n.find().where({lang:c})).length,f={title:d,lang:c,link:"null"!==o?o:null,user_id:s.getId(e),number:g+1};l&&"null"!==l&&"unlink"!==l?(await n.findOneAndUpdate({content_id:l},{content_id:null}),await t.findOneAndUpdate({content_id:l},{content_id:null}),await a.findOneAndUpdate({content_id:l},{content_id:null}),f.content_id=l,await i.findByIdAndUpdate(l,{bindedToMenu:!0})):f.content_id=null;const _=await new n(f).save();return await new r({type_content:"Головне меню",operation:"Додавання пункту головного меню ".concat(_.title),user:m.login}).save(),u.redirect("/admin/".concat(m.id,"/mainmenu/lang/").concat(c))}return u.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:"/admin/".concat(m.id,"/main"),url_text:"Повернутися до Головного Меню",user:m.id})}return null===await o(e.session,m.id,u)?u.redirect("/admin/login"):u.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:m.id})},module.exports.setUp=async(e,t)=>{const i=await d.findById(s.getId(e)),a=await n.findById(e.params.id).lean(),r=await n.findOne().where({number:a.number-1});return null!==r&&(await n.findByIdAndUpdate({_id:r._id},{$set:{number:r.number+1}}),await n.findByIdAndUpdate({_id:e.params.id},{$set:{number:a.number-1}})),t.redirect("/admin/".concat(i.id,"/mainmenu/lang/").concat(e.params.lang))},module.exports.setDown=async(e,t)=>{const i=await d.findById(s.getId(e)),a=await n.findById(e.params.id).lean(),r=await n.findOne().where({number:a.number+1});return null!==r&&(await n.findByIdAndUpdate({_id:r._id},{$set:{number:r.number-1}}),await n.findByIdAndUpdate({_id:e.params.id},{$set:{number:a.number+1}})),t.redirect("/admin/".concat(i.id,"/mainmenu/lang/").concat(e.params.lang))},module.exports.Back=(e,n)=>{try{switch(e.params.type){case"1":case"2":return n.redirect("..");default:return n.sendStatus(500)}}catch(t){console.error(t)}};