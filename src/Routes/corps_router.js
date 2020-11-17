"use strict";const e=require("path"),r=require("express"),o=require("../Controllers/corps_controller"),t=require("multer"),s=require("body-parser"),d=s.urlencoded({extended:!1}),p=t({dest:e.join(__dirname,"../..","uploads/images/temp")}),i=p.array("sign_imgs"),g=p.array("background_imgs"),u=r.Router();u.get("/corps/:page([0-9]+)",o.getCorpsList),u.route("/corps/edit/:id").get(o.getEditCorps).post(o.postEditedCorps),u.route("/corps/add").get(o.getAddCorps).post(o.postAddedCorps),u.post("/corps/delete/:id",o.deleteCorps),u.post("/corps/sign/delete",o.deleteCorpsSign),u.post("/corps/bg/delete",o.deleteCorpsBackground),u.get("/corps/photo-editor",o.getPhotoEditor),module.exports=u;