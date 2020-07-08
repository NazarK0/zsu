"use strict";const e=require("express"),t=require("../Controllers/public_controller"),n=e.Router();n.get("/main_menu",t.getMainMenu),n.get("/side_menu",t.getSideMenu),n.get("/news",t.getNewsALL),n.get("/side_menu/:id?",t.getElementSideMenu),n.get("/element_menu/:id?",t.getElementMenuBody),n.get("/news/:id?",t.getNewsOne),n.get("/links",t.getSocialLinks),n.get("/troops",t.getAllTroops),n.get("/command",t.getAllCommand),n.get("/images/:content/:type/:img",t.getContentPicture),n.get("/files/:content/:name",t.getContentFile),n.get("/corps/img/:type/:name",t.getCorpsImg),n.get("/command/img/:type/:name",t.getCommandImg),n.get("/rss",t.getRss),module.exports=n;