"use strict";const{link:n}=require("fs"),{first:e}=require("lodash"),t=require("lodash"),d=require("../../Models/ChildSub"),i=require("../../Models/Content"),a=require("../../Models/Submenu");module.exports.updateChildSub=async n=>{const{id:e}=n.params,{title:t,lang:l,content_id:o,link_id:u}=n.body;try{if("null"!==o&&"unlink"!==o&&o)await i.updateMany({generated_menu_link:e},{generated_menu_link:null}),"historyWar"!==o&&"files"!==o&&"contacts"!==o&&"actual"!==o&&"commander"!==o&&await i.findByIdAndUpdate(o,{generated_menu_link:e}),await d.updateMany({content_id:o},{content_id:null}),await d.findByIdAndUpdate(e,{title:t,lang:l,content_id:o}),await a.updateMany({content_id:o},{content_id:null});else if("unlink"===o){const n=await d.findById(e);"null"!==n.content_id&&n.content_id&&await i.findByIdAndUpdate(n.content_id,{generated_menu_link:null}),await d.findByIdAndUpdate(e,{title:t,lang:l,content_id:null})}else await d.findByIdAndUpdate(e,{title:t,lang:l,link:"null"!==u?u:null})}catch(c){console.log(c)}},module.exports.deleteChildSub=async n=>{const{id:e}=n.params;try{const n=await d.findByIdAndRemove(e);let a=await d.find().where({parent_sub:n.parent_sub}).lean();a.sort((n,e)=>n.number-e.number);for(let e=0;e<a.length;e++)await d.findByIdAndUpdate({_id:a[e]._id},{$set:{number:e+1}});"null"!==n.content_id&&n.content_id&&"historyWar"!==n.content_id&&"files"!==n.content_id&&"contacts"!==n.content_id&&"actual"!==n.content_id&&"commander"!==n.content_id&&await i.findByIdAndUpdate(n.content_id,{generated_menu_link:null});const l=await d.find({parent_sub:n.id}).select({_id:1});let o=[];for(let e=0;e<l.length;e++)o.push(await d.find({parent_sub:l[e].id}).select({_id:1}));o=t.flattenDeep(o);const u=t.concat(l,o);for(let e=0;e<u.length;e++)await d.findByIdAndDelete(u[e].id),await i.findOneAndUpdate({generated_menu_link:u[e]},{generated_menu_link:null})}catch(a){console.log(a)}};