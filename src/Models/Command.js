"use strict";const i=require("mongoose"),n=i.Schema,t=new n({title_ua:String,title_en:String,link:String,sign_id:String,bg_id:String,user_id:String,signImg:String});module.exports=i.model("commands",t);