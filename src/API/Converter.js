"use strict";const e=require("path"),t=require("fs"),n=require("../Models/Content"),s=require("../Models/CorpsSign"),i=require("../Models/CommandSign"),r=require("../Models/CorpsBackground");module.exports.getConvert=e=>JSON.parse(JSON.stringify(e)),module.exports.getSidemenuConverted=async e=>{const t=JSON.parse(JSON.stringify(e));for(let i=0;i<t.length;i++)if(t[i].content_id)try{const{page_title:e}=await n.findById(t[i].content_id).select({page_title:1,lang:2});t[i].content_title=e}catch(s){t[i].content_title="Не встановлено"}else t[i].content_title="Не встановлено";return t},module.exports.getCorpsConverted=async e=>{const t=JSON.parse(JSON.stringify(e));for(let i=0;i<t.length;i++)if(t[i].sign_id)try{const e=await s.findById(t[i].sign_id);t[i].sign_base64=e.base64}catch(n){t[i].sign_base64=""}else t[i].sign_base64="";return t},module.exports.getCommandConverted=async e=>{const t=JSON.parse(JSON.stringify(e));for(let s=0;s<t.length;s++)if(t[s].sign_id)try{const e=await i.findById(t[s].sign_id);t[s].sign_base64=e.base64}catch(n){t[s].sign_base64=""}else t[s].sign_base64="";return t},module.exports.getCategoryPhotoBodyConverted=async e=>e.photo;