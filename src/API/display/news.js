"use strict";const e=require("moment"),t=require("../../Models/News"),s=require("../../Models/Category");module.exports=async(s,i)=>{let a={};const n=[];if("string"==typeof i?n.push(i):i instanceof Array&&n.push(...i),a.public_status={$in:n},s.length){const e=s.filter(e=>"ua"!==e&&"en"!==e);if(s.includes("ua")){const s=await t.find({language:"ua"}).select({_id:1}).lean();e.push(...s.map(e=>e._id.toString()))}if(s.includes("en")){const s=await t.find({language:"en"}).select({_id:1}).lean();e.push(...s.map(e=>e._id.toString()))}const i=Array.from(new Set(e));a={...{...a},_id:{$in:i}}}const l=await t.find(a).lean(),r=[];for(let t=0;t<l.length;t++){const s={},a=e(l[t].publishDate).format("DD.MM.YYYY HH:mm");let n="-";switch(l[t].public_status){case"deffered":n="Відкладено";break;case"cancel":n="Скасовано"}s._id=l[t]._id,s.title=l[t].title,s.language=l[t].language,s.date=a,s.type=l[t].type,i.includes("active")?s.views=l[t].views:(s.keywords=l[t].keywords,s.publicStatus=n),r.push(s)}return r.reverse(),r};