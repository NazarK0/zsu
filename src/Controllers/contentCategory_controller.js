"use strict";const e=require("../Models/Category"),t=require("../Models/User"),r=require("../Models/History"),i=require("../API/getAdminid"),{ValidSession:a}=require("../API/Session/session"),d=require("../API/userAPI/hasAccess"),n=require("../API/op_categories"),o=require("../API/userAPI/enabledIds"),{getConvert:s}=require("../API/Converter");module.exports.getCategoryList=async(r,a)=>{const d=await t.findById(i.getId(r));try{const{contentType:t}=r.params,i=await e.find({contentType:t}).lean(),n=Array.from(i).map(e=>{const t={...e};return e.img?t.img="/image/".concat(e.img,"?height=90&width=90"):t.img="",t});return a.render("main_menu_category",{user:d.id,categories:n,contentType:t})}catch(n){console.error(n)}},module.exports.getAddCategory=async(e,r)=>{const a=await t.findById(i.getId(e)),{contentType:d}=e.params,n={mode:"add",userid:a.id,contentType:d};return r.render("edit_category",n)},module.exports.postAddCategory=async(r,a)=>{const d=await t.findById(i.getId(r)),{title_ua:n,title_en:o,categoryId:s}=r.body,{contentType:c}=r.params,y={title_ua:n,title_en:o,user_id:d.id,contentType:c};return s?await e.findByIdAndUpdate(s,y):await new e(y).save(),a.redirect("./1")},module.exports.getEditCategory=async(r,a)=>{const d=await t.findById(i.getId(r)),{contentType:n,id:o}=r.params,{title_ua:s,title_en:c,img:y}=await e.findById(o).lean(),g={mode:"edit",title_ua:s,title_en:c,userid:d.id,categoryId:o,contentType:n};return g.imgSrc=y?"/image/".concat(y,"?height=200&width=200"):"",a.render("edit_category",g)},module.exports.postEditCategory=async(r,a)=>{await t.findById(i.getId(r));const{title_ua:d,title_en:n}=r.body,{contentType:o,id:s}=r.params,c={title_ua:d,title_en:n};return await e.findByIdAndUpdate(s,c),a.redirect("../1")},module.exports.postDeleteCategory=async(r,a)=>{try{let d=await t.findById(i.getId(r));return await e.findByIdAndRemove(r.params.id),a.redirect("/admin/".concat(d._id,"/news/category/1"))}catch(d){console.log(d)}};