"use strict";const t=require("mongoose"),e=require("moment"),{Schema:n}=t,r=new n({page_title:String,description:String,content_folder:String,content_baseUrl:String,page_type:String,page_subclass:String,keywords:String,generated_menu_link:String,generated_sidemenu_link:String,categoryFK:String,html_body:String,url_rss:String,lang:String,user_id:String,public_status:{type:String,default:"active"},date:{type:String},hasActualContent:{type:Boolean,default:!1},isMain:{type:Boolean,default:!1},links:[String]});module.exports=t.model("content",r);