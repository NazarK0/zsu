"use strict";const{Schema:e,model:t}=require("mongoose"),i=require("moment"),n=new e({title:String,description:String,keywords:String,bindedToMenu:{type:Boolean,default:!1},bindedToActualContent:{type:Boolean,default:!1},categoryFK:String,html_body:String,language:String,user_id:String,public_status:{type:String,default:"deffered"},isMain:{type:Boolean,default:!1},publishDate:{type:String,default:i().toISOString()},mainPhoto:{type:String,default:""},views:{type:Number,default:0},slider:[String],files:[String],links:[String]});module.exports=t("pages",n);