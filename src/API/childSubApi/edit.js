"use strict";const n=require("lodash"),e=require("../../Models/ChildSub"),t=require("../../Models/Content"),d=require("../../Models/Submenu");module.exports.updateChildSub=async n=>{const{id:a}=n.params,{title:i,lang:l,content_id:o}=n.body;try{if("null"!==o&&"unlink"!==o&&o)await t.updateMany({generated_menu_link:a},{generated_menu_link:null}),await t.findByIdAndUpdate(o,{generated_menu_link:a}),await e.updateMany({content_id:o},{content_id:null}),await e.findByIdAndUpdate(a,{title:i,lang:l,content_id:o}),await d.updateMany({content_id:o},{content_id:null});else if("unlink"===o){const n=await e.findById(a);"null"!==n.content_id&&n.content_id&&await t.findByIdAndUpdate(n.content_id,{generated_menu_link:null}),await e.findByIdAndUpdate(a,{title:i,lang:l,content_id:null})}else await e.findByIdAndUpdate(a,{title:i,lang:l})}catch(u){console.log(u)}},module.exports.deleteChildSub=async d=>{const{id:a}=d.params;try{const d=await e.findByIdAndRemove(a);let i=await e.find().where({parent_sub:d.parent_sub}).sort({number:1}).lean();for(let n=0;n<i.length;n++)await e.findByIdAndUpdate({_id:i[n]._id},{$set:{number:n+1}});"null"!==d.content_id&&d.content_id&&await t.findByIdAndUpdate(d.content_id,{generated_menu_link:null});const l=await e.find({parent_sub:d.id}).select({_id:1});let o=[];for(let n=0;n<l.length;n++)o.push(await e.find({parent_sub:l[n].id}).select({_id:1}));o=n.flattenDeep(o);const u=n.concat(l,o);for(let n=0;n<u.length;n++)await e.findByIdAndDelete(u[n].id),await t.findOneAndUpdate({generated_menu_link:u[n]},{generated_menu_link:null})}catch(i){console.log(i)}};