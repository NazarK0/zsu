"use strict";const n=require("../../Models/Content"),e=require("../../Models/ChildSub"),t=require("../../Models/Submenu");module.exports.addSubChild=async(d,i)=>{try{const{title:l,lang:a,content_id:u}=d.body,{submenu_id:o}=d.params;let c;"null"!==u&&"unlink"!==u&&u?(await t.findOneAndUpdate({content_id:u},{content_id:null}),await e.findOneAndUpdate({content_id:u},{content_id:null}),c=new e({title:l,lang:a,parent_sub:o,child:[],content:null,content_id:u,user_id:i})):c=new e({title:l,lang:a,parent_sub:o,child:[],content:null,content_id:null,user_id:i}),await c.save(),c.content_id&&await n.findByIdAndUpdate(u,{generated_menu_link:c.id})}catch(l){console.log(l)}};