"use strict";const e=require("express"),s=require("../Controllers/news_controller"),t=e.Router(),r=require("moment"),{getJSON:o}=require("../API/DownloaderAPI/downloader");t.get("/news/:page([0-9]+)",s.getAllNews),t.route("/news/edit/:id"),t.post("/news/delete/:id",s.deleteNews),t.post("/news/delete/:id",s.deleteNews),t.get("/news/xlsx",async(e,s)=>{const t=await o(2);return s.xls(`${t.name_file}-${r().format("DD-MM-YYYY")}.xlsx`,t.json)}),module.exports=t,module.exports=t;