"use strict";const e=require("path"),o=require("express"),t=require("multer"),n=require("body-parser"),s=require("../Controllers/fetch_controller"),a=require("../Models/News"),d=require("../Models/Category"),i=n.urlencoded({extended:!1}),p=t({dest:e.join(__dirname,"../..","uploads/temp")}),l=p.single("mainPhoto"),r=p.array("slider"),g=p.array("files"),m=p.array("background_imgs"),c=p.array("sign_imgs"),y=p.single("categoryImage"),u=p.single("link_img"),C=p.single("actualContentImage"),h=p.array("galery"),S=o.Router();S.post("/upload/main-photo",i,l,s.postUploadMainPhoto),S.post("/delete/main-photo",i,t().none(),s.postDeleteMainPhoto),S.post("/upload/slider",i,r,s.postUploadSlider),S.post("/add/slider",i,r,s.postAddSlider),S.post("/delete/slider-image",i,t().none(),s.postDeleteSliderImage),S.post("/upload/files",i,g,s.postUploadFiles),S.post("/add/files",i,g,s.postAddFiles),S.post("/delete/file",i,t().none(),s.postDeleteFile),S.post("/corps/bg/add",i,m,s.postSendCorpsBG),S.post("/corps/bg/delete/:id",i,t().none(),s.postDeleteCorpsBG),S.post("/corps/sign/add",i,c,s.postSendCorpsSign),S.post("/corps/sign/delete/:id",i,t().none(),s.postDeleteCorpsSign),S.post("/command/bg/add",i,m,s.postSendCommandBG),S.post("/command/bg/delete/:id",i,t().none(),s.postDeleteCommandBG),S.post("/command/sign/add",i,c,s.postSendCommandSign),S.post("/command/sign/delete/:id",i,t().none(),s.postDeleteCommandSign),S.post("/upload/category-photo",i,y,s.postUploadCategoryPhoto),S.post("/delete/category-photo",i,t().none(),s.postDeleteCategoryPhoto),S.post("/link-img/send",i,u,s.postSetLinkImg),S.post("/link-img/delete/:id",i,t().none(),s.postDeleteLinkImg),S.get("/link-img/:img",s.getLinkPicture),S.post("/upload/actual-content-img",i,C,s.postUploadActualContentImg),S.post("/delete/actual-content-img",i,t().none(),s.postDeleteActualContentImg),S.post("/upload/galery",i,h,s.postUploadGalery),S.post("/add/galery",i,h,s.postAddGalery),S.post("/delete/galery-image",i,t().none(),s.postDeleteGaleryImage),S.post("/content/links/save",i,t().none(),s.postSaveContentLinks),S.get("/migration-converter",s.setMigrarion),S.get("/migration-news",async(e,o)=>((await a.find().lean()).forEach(async e=>{void 0===e.type&&await a.findByIdAndUpdate(e._id,{type:"Головна"})}),o.json(!0))),S.get("/category-migration/all",async(e,o)=>((await d.find().lean()).forEach(async e=>{await d.findByIdAndUpdate(e._id,{contentType:"news"})}),o.json(!0))),module.exports=S;