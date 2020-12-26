"use strict";const e=require("path"),d=require("express"),o=require("../Controllers/command_controller"),t=require("multer"),m=require("body-parser"),r=m.urlencoded({extended:!1}),a=t({dest:e.join(__dirname,"../..","uploads/temp")}),n=a.array("sign_imgs"),s=a.array("background_imgs"),i=d.Router();i.get("/command/:page([0-9]+)",o.getCommandList),i.route("/command/edit/:id").get(o.getEditCommand).post(o.postEditedCommand),i.route("/command/add").get(o.getAddCommand).post(o.postAddedCommand),i.post("/command/delete/:id",o.deleteCommand),i.post("/command/sign/delete",o.deleteCommandSign),i.post("/command/bg/delete",o.deleteCommandBackground),i.get("/command/photo-editor",o.getPhotoEditor),module.exports=i;