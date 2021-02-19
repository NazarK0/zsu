"use strict";const e=require("express"),t=require("../Controllers/page_controller"),s=e.Router();s.route("/pages/add").get(t.getCreatePage).post(t.postCreatedPage),s.route("/pages/edit/:id").get(t.getEditPage).post(t.postEditedPage),s.get("/pages/:page([0-9]+)",t.getAllPages),s.get("/pages/cancel-publish/:page([0-9]+)",t.getCanceledPages),s.post("/pages/cancel-publish/:id",t.postCancelPublicPage),s.post("/pages/publish/:id",t.postPublicPage),s.post("/pages/delete/:id",t.deletePage),module.exports=s;