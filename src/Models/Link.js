"use strict";const e=require("mongoose"),t=e.Schema,i=new t({title:String,type:String,link:String,user_id:String});module.exports=e.model("links",i);