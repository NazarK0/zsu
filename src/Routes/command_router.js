"use strict";const e=require("path"),d=require("express"),o=require("../Controllers/command_controller"),t=require("multer"),r=require("body-parser"),m=r.urlencoded({extended:!1}),a=t({dest:e.join(__dirname,"../..","uploads/temp")}),n=a.array("sign_imgs"),s=a.array("background_imgs"),i=d.Router();i.get("/command/:page([0-9]+)",o.getCommandList),i.route("/command/edit/:id").get(o.getEditCommand).post(o.postEditedCommand),i.route("/command/add").get(o.getAddCommand).post(o.postAddedCommand),i.post("/command/delete/:id",o.deleteCommand),module.exports=i;