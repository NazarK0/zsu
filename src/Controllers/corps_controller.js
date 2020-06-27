"use strict";const e=require("path"),i=require("fs"),n=require("../Models/Corps"),t=require("../Models/CorpsSign"),r=require("../Models/CorpsBackground"),s=require("../Models/History"),a=require("../Models/User"),d=require("../API/getAdminid"),o=require("../API/op_categories"),u=require("../API/Converter"),{ValidSession:l}=require("../API/Session/session");module.exports.getCorpsList=async(e,i)=>{const t=await a.findById(d.getId(e));if(!0===await l(e.session,t.id,i)){if(!t.operation.includes(o.CORPS))return i.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:`/admin/${t.id}/main`,url_text:"Повернутися до Головного Меню",user:t.id});try{const r=await n.find().select({_id:1,title:2,sign_id:3});let{page:s}=e.params;const a=t.settings.recordsPerPage.corps,d=Math.ceil(r.length/a);(s<1||s>d)&&(s=1);const o=r.slice(a*(s-1),s*a);return i.render("main_menu_corps",{user:t.id,corps:await u.getCorpsConverted(o),pages:d,current_page:s})}catch(r){console.log(r)}}return null===await l(e.session,t.id,i)?i.redirect("/admin/login"):i.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:t.id})},module.exports.getAddCorps=async(e,i)=>{const n=await a.findById(d.getId(e));if(!0===await l(e.session,n.id,i)){if(!n.operation.includes(o.CORPS))return i.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:`/admin/${n.id}/main`,url_text:"Повернутися до Головного Меню",user:n.id});try{return i.render("edit_corps",{action_type:"add",sign:await t.find(),background:await r.find(),userid:n.id,parameter:"hidden"})}catch(s){console.log(s)}}return null===await l(e.session,n.id,i)?i.redirect("/admin/login"):i.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:n.id})},module.exports.getEditCorps=async(e,i)=>{const s=await a.findById(d.getId(e));if(!0===await l(e.session,s.id,i)){if(!s.operation.includes(o.CORPS))return i.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:`/admin/${s.id}/main`,url_text:"Повернутися до Головного Меню",user:s.id});try{const{id:a,title:d,link:o,sign_id:l,bg_id:c}=await n.findById(e.params.id);let g,p;try{g=await t.findById(l)}catch(u){g=null}try{p=await r.findById(c)}catch(u){p=null}return i.render("edit_corps",{title:d,link:o,corpsid:a,current_bg_id:p?p.id:null,current_bg_base64:p?p.base64:null,current_bg_name:p?p.name:null,current_sign_id:g?g.id:null,current_sign_base64:g?g.base64:null,current_sign_name:g?g.name:null,sign:await t.find(),background:await r.find(),userid:s.id,parameter:"visible",action_type:"edit/"+a})}catch(c){console.log(c)}}return null===await l(e.session,s.id,i)?i.redirect("/admin/login"):i.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:s.id})},module.exports.postAddedCorps=async(e,i)=>{const t=await a.findById(d.getId(e));if(!t.operation.includes(o.CORPS))return i.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:`/admin/${t.id}/main`,url_text:"Повернутися до Головного Меню",user:t.id});{const{title:a,link:o,sign_id:u,bg_id:l}=e.body,c=new n({title:a,link:o,sign_id:u,bg_id:l,user_id:d.getId(e)}),g=new s({type_content:" Види/роди військ",operation:"Додавання виду/роду військ "+a,user:t.login});try{await g.save(),await c.save(),i.status(200).redirect("./1")}catch(r){console.log(r)}}},module.exports.postEditedCorps=async(e,i)=>{const t=await a.findById(d.getId(e));if(!t.operation.includes(o.CORPS))return i.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:`/admin/${t.id}/main`,url_text:"Повернутися до Головного Меню",user:t.id});{const{title:a,link:d,sign_id:o,bg_id:u,current_sign_id:l,current_bg_id:c}=e.body;try{await n.findByIdAndUpdate(e.params.id,{title:a,link:d,sign_id:o||l,bg_id:u||c,user_id:t.id});new s({type_content:" Види/роди військ",operation:"Редагування виду/роду військ "+a,user:t.login}).save(),i.redirect("../1")}catch(r){console.log(r)}}},module.exports.deleteCorps=async(e,i)=>{const t=await a.findById(d.getId(e));if(!0===await l(e.session,t.id,i)){if(!t.operation.includes(o.CORPS))return i.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:`/admin/${t.id}/main`,url_text:"Повернутися до Головного Меню",user:t.id});try{const r=await n.findByIdAndDelete(e.params.id);return new s({type_content:" Види/роди військ",operation:"Видалення виду/роду військ "+r.title,user:t.login}).save(),i.redirect("../1")}catch(r){console.log(r)}}return null===await l(e.session,t.id,i)?i.redirect("/admin/login"):i.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:t.id})},module.exports.sendCorpsSign=async(n,r)=>{const s=await a.findById(d.getId(n));if(!s.operation.includes(o.CORPS))return r.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:`/admin/${s.id}/main`,url_text:"Повернутися до Головного Меню",user:s.id});{const s=e.join(__dirname,"../..","uploads/images/corps/sign");if(i.existsSync(s)||i.mkdirSync(s,{recursive:!0}),n.files)return await n.files.map(n=>{const r=`${Date.now()}-${n.originalname}`;i.renameSync(e.join(__dirname,"../../uploads/images/temp",n.filename),e.join(s,r)),new t({name:r,url:e.join(s,r),base64:i.readFileSync(e.join(s,r),"base64")}).save()}),r.status(200)}},module.exports.sendCorpsBackground=async(n,t)=>{const s=await a.findById(d.getId(n));if(!s.operation.includes(o.CORPS))return t.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:`/admin/${s.id}/main`,url_text:"Повернутися до Головного Меню",user:s.id});{const s=e.join(__dirname,"../..","uploads/images/corps/bg");if(i.existsSync(s)||i.mkdirSync(s,{recursive:!0}),n.files)return await n.files.map(n=>{const t=`${Date.now()}-${n.originalname}`;i.renameSync(e.join(__dirname,"../../uploads/images/temp",n.filename),e.join(s,t)),new r({name:t,url:e.join(s,t),base64:i.readFileSync(e.join(s,t),"base64")}).save()}),t.status(200)}},module.exports.deleteCorpsSign=async(r,s)=>{const u=await a.findById(d.getId(r));if(!0===await l(r.session,u.id,s)){if(u.operation.includes(o.CORPS)){const r=await t.find();for(let e=0;e<r.length;e++)await t.findByIdAndDelete(r[e].id),await n.updateMany({sign_id:r[e].id},{sign_id:null});const a=e.join(__dirname,"../..","uploads/images/corps/sign"),d=i.readdirSync(a);for(let n=0;n<d.length;n++)"default.jpg"!==d[n]&&i.unlinkSync(e.join(a,d[n]));return s.status(200).redirect("..")}return s.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:`/admin/${u.id}/main`,url_text:"Повернутися до Головного Меню",user:u.id})}},module.exports.deleteCorpsBackground=async(t,s)=>{const u=await a.findById(d.getId(t));if(!0===await l(t.session,u.id,s)){if(u.operation.includes(o.CORPS)){const t=await r.find();for(let e=0;e<t.length;e++)await r.findByIdAndDelete(t[e].id),await n.updateMany({bg_id:t[e].id},{bg_id:null});const a=e.join(__dirname,"../..","uploads/images/corps/bg"),d=i.readdirSync(a);for(let n=0;n<d.length;n++)i.unlinkSync(e.join(a,d[n]));return s.status(200).redirect("..")}return s.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",user:u.id})}return null===await l(t.session,u.id,s)?s.redirect("/admin/login"):s.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:u.id})},module.exports.getPhotoEditor=async(e,i)=>{const n=await a.findById(d.getId(e));if(!0===await l(e.session,n.id,i)){if(n.operation.includes(o.CORPS)){const e=u.getConvert(await r.find()),s=u.getConvert(await t.find());return i.status(200).render("corps_photo_editor",{backgrounds:e,signs:s,user:n.id})}return i.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",user:n.id})}return null===await l(e.session,n.id,i)?i.redirect("/admin/login"):i.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:n.id})},module.exports.postDeleteBackgroundOne=async(n,t)=>{const u=await a.findById(d.getId(n));if(!0===await l(n.session,u.id,t)){if(!u.operation.includes(o.CORPS))return t.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:`/admin/${u.id}/main`,url_text:"Повернутися до Головного Меню",user:u.id});{const{id:a}=n.params;try{const n=await r.findByIdAndDelete(a);if(n)try{i.unlinkSync(e.join(__dirname,"../..","uploads/images/corps/bg",n.name))}catch(c){console.log(c)}return new s({type_content:" Види/роди військ",operation:`Видалення фонового зображення ${n.name} для виду/роду військ `,user:u.login}).save(),t.redirect("../../photo-editor")}catch(c){console.log(c)}}}return null===await l(n.session,u.id,t)?t.redirect("/admin/login"):t.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:u.id})},module.exports.postDeleteSignOne=async(n,r)=>{const u=await a.findById(d.getId(n));if(!0===await l(n.session,u.id,r)){if(!u.operation.includes(o.CORPS))return r.status(400).render("infopage",{info:"Вам обмежено доступ для данної Категорії!",url:`/admin/${u.id}/main`,url_text:"Повернутися до Головного Меню",user:u.id});{const{id:a}=n.params;try{const n=await t.findByIdAndDelete(a);if(n)try{i.unlinkSync(e.join(__dirname,"../..","uploads/images/corps/sign",n.name))}catch(c){console.log(c)}return new s({type_content:" Види/роди військ",operation:`Видалення емблеми ${n.name} для виду/роду військ `,user:u.login}).save(),r.redirect("../../photo-editor")}catch(c){console.log(c)}}}return null===await l(n.session,u.id,r)?r.redirect("/admin/login"):r.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:u.id})};