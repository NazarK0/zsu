"use strict";const e=require("mongoose"),{Schema:t}=e,i=new t({title:String,description:String,date:String,categoryId:String,link:String});module.exports=e.model("video",i);