"use strict";const t=require("../Models/Category"),e=require("../Models/User"),o=require("../Models/History"),r=require("../API/getAdminid"),{ValidSession:a}=require("../API/Session/session"),i=require("../API/userAPI/hasAccess"),s=require("../API/op_categories"),d=require("../API/userAPI/enabledIds"),{getConvert:n}=require("../API/Converter");module.exports.getCategoryList=async(o,a)=>{const i=await e.findById(r.getId(o));try{let{page:e}=o.params;const r=JSON.parse(JSON.stringify(await t.find()));for(let t=0;t<r.length;t++){const e=await CategoryPhoto.findById(r[t].photo);r[t].photo=null!==e?e.base64:null}const s=i.settings.recordsPerPage.command,d=Math.ceil(r.length/s);(e<1||e>d)&&(e=1);const n=r.slice(s*(e-1),e*s);return a.render("main_menu_category",{user:i.id,category:n,pages:d,current_page:e})}catch(s){console.log(s)}},module.exports.getAddCategory=async(t,o)=>{const a=await e.findById(r.getId(t)),i=JSON.parse(JSON.stringify(await CategoryPhoto.find()));try{o.render("edit_category",{action_type:"add",userid:a.id,category_photos:i,parameter:"false"})}catch(s){console.log(s)}},module.exports.getEditCategory=async(o,a)=>{try{const i=await e.findById(r.getId(o)),s=JSON.parse(JSON.stringify(await t.findById(o.params.categoryId))),d=JSON.parse(JSON.stringify(await CategoryPhoto.findById(s.photo))),n=JSON.parse(JSON.stringify(await CategoryPhoto.find()));s.photo=d;const{photo:c,title_ua:y,title_en:g,_id:u}=s;return a.render("edit_category",{action_type:"edit/".concat(u),title_ua:y,title_en:g,current_photo:c,userid:i.id,category_photos:n,categoryId:o.params.categoryId})}catch(i){a.status(500)}},module.exports.postAddCategory=async(e,o)=>{try{const{title_ua:r,title_en:a,bg_id:i}=e.body;return await new t({title_ua:r,title_en:a,photo:i}).save(),o.redirect("./1")}catch(r){o.status(500)}},module.exports.postEditCategory=async(o,a)=>{const i=await e.findById(r.getId(o)),{title_ua:s,title_en:d,bg_id:n}=o.body;return await t.findByIdAndUpdate({_id:o.params.categoryId},{$set:{title_ua:s,title_en:d,photo:n}}),a.redirect("/admin/".concat(i._id,"/news/category/1"))},module.exports.postRemoveCategory=async(o,a)=>{try{const i=await e.findById(r.getId(o));return await t.findByIdAndDelete(o.params.categoryId),a.redirect("/admin/".concat(i._id,"/news/category/1"))}catch(i){}},module.exports.getPhtotoEditor=async(t,o)=>{current_user=await e.findById(r.getId(t));try{const t=n(await CategoryPhoto.find());return o.status(200).render("category_photo_editor",{photos:t,user:current_user.id})}catch(a){return o.status(500)}},module.exports.postRemovePhotoCategory=async(t,e)=>{try{const o=r.getId(t);await CategoryPhoto.findByIdAndRemove(t.params.id);return e.redirect("/admin/".concat(o,"/news/category/photo-editor"))}catch(o){e.status(500).json("Error postRemovePhotoCategory")}};