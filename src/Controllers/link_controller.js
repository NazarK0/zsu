"use strict";const e=require("path"),i=require("fs"),t=require("../Models/Link"),n=require("../Models/History"),r=require("../Models/User"),a=require("../API/link_categories"),s=require("../API/getAdminid"),d=require("../API/op_categories"),o=require("../API/Converter"),{ValidSession:l}=require("../API/Session/session"),u=require("../API/userAPI/hasAccess"),c=require("../API/userAPI/enabledIds"),g=require("../API/isExistHelper"),{imgFolderPath:p}=require("../API/constants/uploadPaths");module.exports.getLinks=async(n,a)=>{const g=await r.findById(s.getId(n));if(!0===await l(n.session,g.id,a)){if(!(await u(g.id,d.LINKS)))return a.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:"/admin/".concat(g.id,"/main"),url_text:"Повернутися до Головного Меню",user:g.id});try{const r=await c(g.id,d.LINKS);let s={};r.length&&(s={_id:{$in:r}});const l=await t.find(s);(await t.find({title_ua:void 0}).lean()).forEach(({img:t})=>{if(t)try{i.unlinkSync(e.join(p,t))}catch(n){console.error(n)}}),await t.deleteMany({title_ua:void 0});let{page:u}=n.params;const f=g.settings.recordsPerPage.links,m=Math.ceil(l.length/f);(u<1||u>m)&&(u=1);const _=l.slice(f*(u-1),u*f);return a.render("main_menu_links",{user:g.id,links:o.getConvert(_),pages:m,current_page:u})}catch(f){console.error(f)}}return null===await l(n.session,g.id,a)?a.redirect("/admin/login"):a.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:g.id})},module.exports.AddingForm=async(e,i)=>{const t=await r.findById(s.getId(e));if(!0===await l(e.session,t.id,i)){if(!(await u(t.id,d.LINKS)))return i.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:"/admin/".concat(t.id,"/main"),url_text:"Повернутися до Головного Меню",user:t.id});try{return i.render("edit_links",{action_type:"add",userid:t.id,categoriesList:[...Object.values(a)],parameter:"hidden"})}catch(n){console.error(n)}}return null===await l(e.session,t.id,i)?i.redirect("/admin/login"):i.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:t.id})},module.exports.EditForm=async(e,i)=>{const n=await r.findById(s.getId(e));if(!0===await l(e.session,n.id,i)){if(!(await u(n.id,d.LINKS)))return i.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:"/admin/".concat(n.id,"/main"),url_text:"Повернутися до Головного Меню",user:n.id});try{const{id:r,title_ua:s,title_en:d,type:o,link:l,description:u,img:c}=await t.findById(e.params.id);return i.render("edit_links",{title_ua:s,title_en:d,description:u,imgSrc:c?"/image/".concat(c,"?width=300&height=200"):null,type:o,link:l,linkid:r,userid:n.id,parameter:"visible",action_type:"edit/".concat(r),categoriesList:[...Object.values(a)]})}catch(o){console.error(o)}}return null===await l(e.session,n.id,i)?i.redirect("/admin/login"):i.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:n.id})},module.exports.Addlink=async(e,i)=>{const a=await r.findById(s.getId(e));if(!0===await l(e.session,a.id,i)){if(!(await u(a.id,d.LINKS)))return i.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:"/admin/".concat(a.id,"/main"),url_text:"Повернутися до Головного Меню",user:a.id});{const{title_ua:r,title_en:d,type:l,link:u,description:c,link_id:g}=e.body;g?await t.findByIdAndUpdate(g,{title_ua:r,title_en:d,type:l,description:c,link:u,user_id:s.getId(e)}):await new t({title_ua:r,title_en:d,type:l,description:c,link:u,user_id:s.getId(e)}).save();const p=new n({type_content:" Посилання",operation:"Додавання посилання ".concat(r,"[").concat(l,"]"),user:a.login});try{return await p.save(),i.redirect("./1")}catch(o){console.error(o)}}}return null===await l(e.session,a.id,i)?i.redirect("/admin/login"):i.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:a.id})},module.exports.EditLinks=async(e,i)=>{const a=await r.findById(s.getId(e));if(!0===await l(e.session,a.id,i)){if(!(await u(a.id,d.LINKS)))return i.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:"/admin/".concat(a.id,"/main"),url_text:"Повернутися до Головного Меню",user:a.id});{const{title_ua:r,title_en:s,type:d,link:l,description:u}=e.body;try{await t.findByIdAndUpdate(e.params.id,{title_ua:r,title_en:s,description:u,type:d,link:l,user_id:a.id});return new n({type_content:" Посилання",operation:"Редагування посилання ".concat(r),user:a.login}).save(),i.redirect("../1")}catch(o){console.error(o)}}}return null===await l(e.session,a.id,i)?i.redirect("/admin/login"):i.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:a.id})},module.exports.removeLink=async(a,o)=>{const c=await r.findById(s.getId(a));if(!0===await l(a.session,c.id,o)){if(!(await u(c.id,d.LINKS)))return o.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:"/admin/".concat(c.id,"/main"),url_text:"Повернутися до Головного Меню",user:c.id});{const r=e.join(__dirname,"../..","uploads","/images/links"),{id:s}=a.params;try{const{isImgExist:a,filename:d}=g(s,r);a&&i.unlinkSync(e.join(r,d));const l=await t.findByIdAndDelete(s);return new n({type_content:" Посилання",operation:"Видалення посилання".concat(l.title_ua),user:c.login}).save(),o.redirect("../1")}catch(p){console.error(p)}}}return null===await l(a.session,c.id,o)?o.redirect("/admin/login"):o.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:c.id})};