"use strict";const e=require("lodash"),i=require("../Models/Submenu"),t=require("../Models/Main_Menu"),n=require("../Models/Content"),a=require("../Models/ChildSub"),d=require("../Models/History"),r=require("../API/getAdminid"),s=require("../API/op_categories"),u=require("../API/Converter"),{ValidSession:l}=require("../API/Session/session"),{getAll:o}=require("../API/getAllChildSub"),{addSubChild:_}=require("../API/childSubApi/add"),{getBody:m}=require("../API/childSubApi/getBody"),{updateChildSub:c,deleteChildSub:p}=require("../API/childSubApi/edit"),{updateSubmenu:g}=require("../API/SubMenuAPI/updateSubmenu"),{userFind:w}=require("../API/userAPI/findUser");module.exports.getSubmenu=async(e,n)=>{const a=await w(r.getId(e));if(!0===await l(e.session,a.id,n)){if(!a.operation.includes(s.MAIN_MENU))return n.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:`/admin/${a.id}/main`,url_text:"Повернутися до Головного Меню",user:a.id});try{const{mainmenu_id:a}=e.params,d=await t.findById(a),s=await i.find().where({parent_main:e.params.mainmenu_id});return n.render("submenu_list",{user:r.getId(e),submenu:await u.getConvert(JSON.parse(JSON.stringify(s))),mainmenu_id:a,name_of_parent:d.title})}catch(d){console.error(d)}}return null===await l(e.session,a.id,n)?n.redirect("/admin/login"):n.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:a.id})},module.exports.getEditSubmenuItem=async(e,t)=>{const d=await w(r.getId(e));if(!0===await l(e.session,d.id,t)){if(!d.operation.includes(s.MAIN_MENU))return t.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:`/admin/${d.id}/main`,url_text:"Повернутися до Головного Меню",user:d.id});{const{id:r,mainmenu_id:s}=e.params;let l="visible";try{const e=await i.findById(r);(await a.find().where({parent_sub:e.id})).length>0&&(l="hidden");const u=await n.find().where({page_type:"content_page"}).select({_id:1,page_title:2,generated_menu_link:3,generated_sidemenu_link:4,lang:5,keywords:6});return t.status(200).render("edit_submenu",{title:e.title,lang:e.lang,userid:d.id,action_type:"edit/"+r,id:r,mainmenu_id:s,parameter:"visible",vis:l,content_page_list:u,child_have:l,Info:"Редагування пункту Меню: "+e.title})}catch(u){console.error(u)}}}return null===await l(e.session,d.id,t)?t.redirect("/admin/login"):t.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:d.id})},module.exports.postEditedSubmenuItem=async(e,t)=>{const n=await w(r.getId(e)),{id:a}=e.params,u=await i.findById(a);if(!0===await l(e.session,n.id,t)){if(!n.operation.includes(s.MAIN_MENU))return t.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:`/admin/${n.id}/main`,url_text:"Повернутися до Головного Меню",user:n.id});try{await g(a,e);const i=new d({type_content:"Під Меню",operation:"Редагування під пункту Головного Меню: "+u.title,user:n.login});return await i.save(),t.redirect("..")}catch(o){console.error(o)}}return null===await l(e.session,n.id,t)?t.redirect("/admin/login"):t.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:n.id})},module.exports.deleteSubmenuItem=async(t,u)=>{const o=await w(r.getId(t));if(!0===await l(t.session,o.id,u)){if(!o.operation.includes(s.MAIN_MENU))return u.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:`/admin/${o.id}/main`,url_text:"Повернутися до Головного Меню",user:o.id});{const{id:r}=t.params,s=await i.findById(r);try{const t=await i.findByIdAndDelete(r);"null"!==s.content_id&&s.content_id&&await n.findByIdAndUpdate(s.content_id,{generated_menu_link:null});let l=await a.find({parent_sub:t.id}).select({_id:1}),_=[];for(let e=0;e<l.length;e++)_.push(await a.find({parent_sub:l[e].id}).select({_id:1}));_=e.flattenDeep(_);let m=[];for(let e=0;e<_.length;e++)m.push(await a.find({parent_sub:_[e].id}).select({_id:1}));m=e.flattenDeep(m);const c=e.concat(l,_,m);for(let e=0;e<c.length;e++)await a.findByIdAndDelete(c[e].id),await n.findOneAndUpdate({generated_menu_link:c[e]},{generated_menu_link:null});const p=new d({type_content:"Підменю",operation:`Видалення підпункту ${s.title} Головного Меню `,user:o.login});return await p.save(),u.status(200).redirect("..")}catch(_){console.error(_)}}}return null===await l(t.session,o.id,u)?u.redirect("/admin/login"):u.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:o.id})},module.exports.getAddSubmenuItem=async(e,i)=>{const t=await w(r.getId(e)),{mainmenu_id:a}=e.params,d=await n.find().where({page_type:"content_page"}).select({_id:1,page_title:2,generated_menu_link:3,generated_sidemenu_link:4,lang:5,keywords:6});return!0===await l(e.session,t.id,i)?t.operation.includes(s.MAIN_MENU)?i.status(200).render("edit_submenu",{userid:t.id,action_type:"add",parameter:"hidden",mainmenu_id:a,content_page_list:d,vis:"visible",Info:"Cтворення нового пункту меню"}):i.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:`/admin/${t.id}/main`,url_text:"Повернутися до Головного Меню",user:t.id}):null===await l(e.session,t.id,i)?i.redirect("/admin/login"):i.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:t.id})},module.exports.postAddedSubmenuItem=async(e,t)=>{const u=await w(r.getId(e));if(!u.operation.includes(s.MAIN_MENU))return t.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:`/admin/${u.id}/main`,url_text:"Повернутися до Головного Меню",user:u.id});{const{title:s,lang:o,content_id:_}=e.body,{mainmenu_id:m}=e.params;let c;"null"!==_&&"unlink"!==_&&_?(await i.findOneAndUpdate({content_id:_},{content_id:null}),await a.findOneAndUpdate({content_id:_},{content_id:null}),c=new i({title:s,parent_main:m,child_sub:null,user_id:r.getId(e),content_id:_,lang:o})):c=new i({title:s,parent_main:m,child_sub:null,user_id:r.getId(e),content_id:null,lang:o});try{await c.save(),"null"!==_&&_&&await n.findByIdAndUpdate(_,{generated_menu_link:c.id});const e=new d({type_content:"Під Меню",operation:"Додавання підпункту Головного Меню "+c.title,user:u.login});return await e.save(),t.redirect(".")}catch(l){console.error(l)}}},module.exports.getChildSubmenu=async(e,t)=>{const n=await w(r.getId(e)),{submenu_id:d}=e.params;if(!0===await l(e.session,n.id,t)){const e=await o(d),r=await i.findById(d);let s;return null===r&&(s=await a.findById(d)),t.render("submenu_childlist",{childlist:e,user:n.id,submenu_id:d,name_of_parent:null!==r?r.title:s.title})}return null===await l(e.session,n.id,t)?t.redirect("/admin/login"):t.status(400).json("Час сесії минув, авторизуйтесь знову!")},module.exports.getAddChildSubmenu=async(e,i)=>{const t=await w(r.getId(e));if(!0===await l(e.session,t.id,i)){const a=await n.find().where({page_type:"content_page"}).select({_id:1,page_title:2,generated_menu_link:3,generated_sidemenu_link:4,lang:5,keywords:6});return i.render("edit_child",{userid:t.id,submenu_id:e.params.submenu_id,parameter:"hidden",action_type:"add",content_page_list:a})}if(null===await l(e.session,t.id,i))return i.redirect("/admin/login");i.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:t.id})},module.exports.postAddChildSubmenu=async(e,i)=>(await _(e,r.getId(e)),i.redirect(".")),module.exports.getEditChildSubmenu=async(e,i)=>{const{id:t,submenu_id:d}=e.params,s=await m(t),{title:u,lang:l}=s;let o="visible";(await a.find().where({parent_sub:t})).length>0&&(o="hidden");const _=await n.find().where({page_type:"content_page"}).select({_id:1,page_title:2,generated_menu_link:3,generated_sidemenu_link:4,lang:5,keywords:6});i.render("edit_child",{userid:r.getId(e),submenu_id:d,parameter:"visible",action_type:"edit/"+t,id:t,title:u,lang:l,content_page_list:_,vis:o})},module.exports.postEditChildSubmenu=async(e,i)=>(await c(e),i.redirect("..")),module.exports.postRemoveChildSubmenu=async(e,i)=>(await p(e),i.status(200).redirect(".."));