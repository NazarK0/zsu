"use strict";const n=require("lodash"),e=require("../../Models/ChildSub"),t=require("../../Models/Content"),d=require("../../Models/Submenu");module.exports.updateChildSub=async n=>{const{id:i}=n.params,{title:a,lang:l,content_id:o}=n.body;try{if("null"!==o&&"unlink"!==o&&o)await t.updateMany({generated_menu_link:i},{generated_menu_link:null}),await t.findByIdAndUpdate(o,{generated_menu_link:i}),await e.updateMany({content_id:o},{content_id:null}),await e.findByIdAndUpdate(i,{title:a,lang:l,content_id:o}),await d.updateMany({content_id:o},{content_id:null});else if("unlink"===o){const n=await e.findById(i);"null"!==n.content_id&&n.content_id&&await t.findByIdAndUpdate(n.content_id,{generated_menu_link:null}),await e.findByIdAndUpdate(i,{title:a,lang:l,content_id:null})}else await e.findByIdAndUpdate(i,{title:a,lang:l})}catch(u){console.log(u)}},module.exports.deleteChildSub=async d=>{const{id:i}=d.params;try{const d=await e.findByIdAndRemove(i);"null"!==d.content_id&&d.content_id&&await t.findByIdAndUpdate(d.content_id,{generated_menu_link:null});const a=await e.find({parent_sub:d.id}).select({_id:1});let l=[];for(let n=0;n<a.length;n++)l.push(await e.find({parent_sub:a[n].id}).select({_id:1}));l=n.flattenDeep(l);const o=n.concat(a,l);for(let n=0;n<o.length;n++)await e.findByIdAndDelete(o[n].id),await t.findOneAndUpdate({generated_menu_link:o[n]},{generated_menu_link:null})}catch(a){console.log(a)}};