"use strict";const e=require("mongoose"),t=e.Schema,i=new t({title_ua:String,title_en:String,type:String,link:String,user_id:String});module.exports=e.model("links",i);