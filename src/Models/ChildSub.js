"use strict";const t=require("mongoose"),e=t.Schema,n=new e({title:String,lang:String,parent_sub:String,parent_childSub:String,child:Array,content_id:String});module.exports=t.model("child_sub",n);