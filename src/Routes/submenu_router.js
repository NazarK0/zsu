"use strict";const e=require("express"),u=require("../Controllers/submenu_controller"),t=e.Router();t.get("/all/:mainmenu_id/submenu",u.getSubmenu),t.route("/all/:mainmenu_id/submenu/edit/:id").get(u.getEditSubmenuItem).post(u.postEditedSubmenuItem),t.route("/all/:mainmenu_id/submenu/add").get(u.getAddSubmenuItem).post(u.postAddedSubmenuItem),t.post("/all/:mainmenu_id/submenu/delete/:id",u.deleteSubmenuItem),t.get("/all/submenu/:submenu_id/child",u.getChildSubmenu),t.route("/all/submenu/:submenu_id/child/add").get(u.getAddChildSubmenu).post(u.postAddChildSubmenu),t.route("/all/submenu/:submenu_id/child/edit/:id").get(u.getEditChildSubmenu).post(u.postEditChildSubmenu),t.post("/all/submenu/:submenu_id/child/remove/:id",u.postRemoveChildSubmenu),t.post("/all/submenu/:submenu_id/child/setUp/:id",u.setUpChildSub),t.post("/all/submenu/:submenu_id/child/setDown/:id",u.setDownChildSub),t.post("/all/submenu/back",(e,u)=>{u.redirect("./.")}),t.post("/submenu/setUp/:id",u.SubmenuSetUp),t.post("/submenu/setDown/:id",u.SubmenuSetDown),module.exports=t;