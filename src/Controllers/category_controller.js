"use strict";const e=require("../Models/Category"),t=require("../Models/User"),r=require("../Models/History"),o=require("../API/getAdminid"),{ValidSession:a}=require("../API/Session/session"),s=require("../API/userAPI/hasAccess"),i=require("../API/op_categories"),d=require("../API/userAPI/enabledIds"),n=require("fs"),{getCategoryPhotoBodyConverted:c,getConvert:y}=require("../API/Converter"),g=require("../Models/CategoryPhoto"),{json:u}=require("express");module.exports.getCategoryList=async(r,a)=>{const s=await t.findById(o.getId(r));try{let{page:t}=r.params;const o=JSON.parse(JSON.stringify(await e.find()));for(let e=0;e<o.length;e++){let t=await g.findById(o[e].photo);o[e].photo=null!==t?t.base64:null}const i=s.settings.recordsPerPage.command,d=Math.ceil(o.length/i);(t<1||t>d)&&(t=1);const n=o.slice(i*(t-1),t*i);return a.render("main_menu_category",{user:s.id,category:n,pages:d,current_page:t})}catch(i){console.log(i)}},module.exports.getAddCategory=async(e,r)=>{const a=await t.findById(o.getId(e)),s=JSON.parse(JSON.stringify(await g.find()));try{r.render("edit_category",{action_type:"add",userid:a.id,category_photos:s,parameter:"false"})}catch(i){console.log(i)}},module.exports.getEditCategory=async(r,a)=>{try{const s=await t.findById(o.getId(r)),i=JSON.parse(JSON.stringify(await e.findById(r.params.categoryId)));let d=JSON.parse(JSON.stringify(await g.findById(i.photo))),n=JSON.parse(JSON.stringify(await g.find()));i.photo=d;const{photo:c,title_ua:y,title_en:u,_id:p}=i;return a.render("edit_category",{action_type:"edit/".concat(p),title_ua:y,title_en:u,current_photo:c,userid:s.id,category_photos:n,categoryId:r.params.categoryId})}catch(s){a.status(500)}},module.exports.postAddCategory=async(t,r)=>{try{const{title_ua:o,title_en:a,bg_id:s}=t.body;return await new e({title_ua:o,title_en:a,photo:s}).save(),r.redirect("./1")}catch(o){r.status(500)}},module.exports.postEditCategory=async(e,t)=>{console.log(e.body)},module.exports.postRemoveCategory=async(r,a)=>{try{const s=await t.findById(o.getId(r));return await e.findByIdAndDelete(r.params.categoryId),a.redirect("/admin/".concat(s._id,"/news/category/1"))}catch(s){}},module.exports.getPhtotoEditor=async(e,r)=>{current_user=await t.findById(o.getId(e));try{const e=y(await g.find());return r.status(200).render("category_photo_editor",{photos:e,user:current_user.id})}catch(a){return r.status(500)}},module.exports.postRemovePhotoCategory=async(e,t)=>{try{const r=o.getId(e);await g.findByIdAndRemove(e.params.id);return t.redirect("/admin/".concat(r,"/news/category/photo-editor"))}catch(r){t.status(500).json("Error postRemovePhotoCategory")}};