"use strict";const e=require("../../Models/Content"),t=require("../../Models/Submenu"),n=require("../../Models/ChildSub"),a=require("../../Models/Sidemenu"),l=require("../../Models/MainPhoto"),i=require("../../Models/Corps"),r=require("../../Models/CorpsSign"),s=require("../../Models/CorpsBackground"),o=require("../../Models/Command"),u=require("../../Models/CommandSign"),c=require("../../Models/CommandBackground"),d=require("../../Models/SliderNames"),f=require("../../Models/Category"),p=require("../../Models/CategoryPhoto"),_=require("../../Models/ContentLinks"),g=require("../../Models/FileNames"),h=require("path"),y=require("fs");let w=require("moment");const{all:b}=require("../../Routes/public_router"),m=require("../../Models/Link"),S=require("../../Models/Contact"),O=async t=>{let n={type:"casual",anchors:[],redirect_pages:[]};switch(t){case"historyWar":let t=await e.find().where({page_subclass:"historyWar",public_status:"active"});if(0!==t.length){t.forEach(e=>{n.anchors.includes(e.anchor_label)||n.anchors.push(e.anchor_label)}),n.anchors.forEach(e=>{let a=[];t.filter(t=>t.anchor_label===e).forEach(e=>{a.push({title:e.page_title,id_page:e._id})});let l={anchor:e,pages:a};n.type="historyWar",n.redirect_pages.push(l)});let e=n.anchors.map(e=>({title:e}));n.anchors=e}break;case"files":n.type="files";let a=await e.find().where({page_subclass:"files",public_status:"active"});if(0!==a.length)for(let e=0;e<a.length;e++){const{content_folder:t,page_title:l}=a[e];let i,r="/files/".concat(t),s=await g.findOne().where({base_url:a[e].content_baseUrl});s&&(i=s.names.map(e=>({title:e,link:r+"/"+e})));let o={title:l,files:i};n.redirect_pages.push(o)}break;case"contact":(await e.find().where({page_subclass:"contacts",public_status:"active"})).forEach(e=>{n.redirect_pages.push({title:e.page_title,id_page:e._id})}),n.type="contact"}return n};async function N(e,t){let n=null,a=null;if(null===e&&null===t)return{front_url:null,back_url:null};const l=await JSON.parse(JSON.stringify(await r.findById(e))),i=await JSON.parse(JSON.stringify(await s.findById(t)));return null!==l&&void 0!==l.url&&(n=l.base64),null!==i&&void 0!==i.url&&(a=i.base64),{front_base64:n,back_base64:a}}async function J(e,t){let n=null,a=null;if(null===e&&null===t)return{front_url:null,back_url:null};const l=await JSON.parse(JSON.stringify(await u.findById(e))),i=await JSON.parse(JSON.stringify(await c.findById(t)));return null!==l&&void 0!==l.url&&(n=l.base64),null!==i&&void 0!==i.url&&(a=i.base64),{front_base64:n,back_base64:a}}module.exports.getOneElementBody=async a=>{if("files"!==a&&"contact"!==a&&"historyWar"!==a){const l=JSON.parse(JSON.stringify(await t.findById(a))),i=JSON.parse(JSON.stringify(await n.findById(a)));if(Boolean(l)){let t={...l};const n=await e.findById(l.content_id);return t.content=n,t.type="casual",null!=n&&"cancel"!==n.public_status?t:null}if(Boolean(i)){let t={...l};const n=await e.findById(i.content_id);return t.content=n,t.type="casual",null!=n&&"cancel"!==n.public_status?t:null}return null}return await O(a)},module.exports.getSideMenu=async t=>{const n=JSON.parse(JSON.stringify(await a.find().where({lang:t}))),l=[];for(let a=0;a<n.length;a++){let t={...n[a]};if(null!==n[a].content_id){let i=await e.findById(n[a].content_id);"cancel"!==i.public_status&&(t.content=i,t.photo=await B(t.content.content_baseUrl),l.push(t))}}return l},module.exports.getNews=async t=>{let n=[],a=[],l=[],i=JSON.parse(JSON.stringify(await e.find().where({page_type:"news",lang:t}).where({public_status:"active"}).sort({date:-1})));for(let e=0;e<i.length;e++){let t={...i[e]};if(t.photo=await B(i[e].content_baseUrl),n.push(t),void 0!==i[e].generated_category_link&&null!==i[e].generated_category_link&&!l.includes(i[e].generated_category_link)){let t=JSON.parse(JSON.stringify(await f.findById(i[e].generated_category_link))),n=JSON.parse(JSON.stringify(await p.findById(t.photo)));t.photo=n.base64,a.push(t),l.push(t._id)}}return{news:n,category:a}},module.exports.getFiltersNews=async t=>{let n=[],a=[],l=[],i=JSON.parse(JSON.stringify(await e.find().where({page_type:"news",lang:t.lang,public_status:"active"})));for(let e=0;e<i.length;e++)if(null!==i[e].content_baseUrl){let t={...i[e]},n=await B(i[e].content_baseUrl);t.photo=null!==n?n.middle:null,l.push(t)}if(""===t.date&""===t.category){let e=await f.find();if(0!==e.length)for(let t=0;t<e.length;t++){let a=await s(e[t]._id);n.push(a)}return{news:l,category:n}}""!==t.date?(a=l.filter(e=>w(e.date).format("DD/MM/YY")===t.date),""!==t.category&&(a=a.filter(e=>e.generated_category_link===t.category))):""!==t.category&&(a=l.filter(e=>e.generated_category_link===t.category));let r=await f.find();if(0!==r.length)for(let e=0;e<r.length;e++){let t=await s(r[e]._id);n.push(t)}async function s(e){let t=await f.findById(e),n=null;return null!==t&&(n=await p.findById(t.photo),null!==n&&(t.photo=n.base64)),t}return{news:a,category:n}},module.exports.getResultForTroops=async()=>{let e=[],t=JSON.parse(JSON.stringify(await i.find()));for(let n=0;n<t.length;n++){const a=await N(t[n].sign_id,t[n].bg_id);let l={title_ua:t[n].title_ua,title_en:t[n].title_en,link:t[n].link,front_photo:a.front_base64,back_photo:a.back_base64};e.push(l)}return e},module.exports.getResultForCommand=async()=>{let e=[],t=JSON.parse(JSON.stringify(await o.find()));for(let n=0;n<t.length;n++){const a=await J(t[n].sign_id,t[n].bg_id);let l={title_ua:t[n].title_ua,title_en:t[n].title_en,link:t[n].link,front_photo:a.front_base64,back_photo:a.back_base64};e.push(l)}return e},module.exports.getSlidersPhotoPath=async(t,n)=>{let a=[],l=[];if(2==n)var i=await e.findOne().where({generated_sidemenu_link:t.params.id});else i=await e.findById(t.params.id);const r=JSON.parse(JSON.stringify(await d.findOne().where({base_url:i.content_baseUrl})));if(r){const{names:e,base_url:t}=r;for(let n=0;n<e.length;n++)a.push(t+"sliders/"+e[n]);for(let n=0;n<a.length;n++){const e=h.join(__dirname,"../../../","uploads",a[n]);l.push(y.readFileSync(e,"base64"))}return l}return null};const k=async t=>{let n=await e.findById(t),a=null,l=null,i=[];if(null!==n){const{page_title:e,description:t,date:u,content_folder:c,html_body:d,content_baseUrl:f}=n;let p=await _.findOne().where({base_url:n.content_baseUrl});if(p=JSON.parse(JSON.stringify(p)),null!==p){var{links:{pages:r,directLink:s,contacts:o}}=p;if(null!==o&&o.forEach(async e=>{let t=await m.findById(e);console.log(t),i.push(t.link)}),""!==s)return{redirectLink:s,content:a};null!==r&&(l=r)}return a={page_title:e,description:t,date:u,html_body:d,files:null!==await M(f)?{names:await M(f),folder:c}:null,slider_photos:await q(f),shared_pages:l,contacs_link:i},{redirectLink:null,content:a}}return{content:null,redirectLink:null}};async function q(e){let t=[],n=[];const a=JSON.parse(JSON.stringify(await d.findOne().where({base_url:e})));if(a){const{names:e,base_url:l}=a;for(let n=0;n<e.length;n++)t.push(l+"sliders/"+e[n]);for(let a=0;a<t.length;a++){const e=h.join(__dirname,"../../../","uploads",t[a]);n.push(y.readFileSync(e,"base64"))}return n}return null}async function M(e){let t=null;return t=JSON.parse(JSON.stringify(await d.findOne().where({base_url:e}))),null!==t?t.names:null}async function B(e,t){const n=await l.findOne().where({base_url:e});if(null!==n&&void 0!==n.name){const t=h.join(__dirname,"../../../","uploads",e,"fullsize",n.name),a=h.join(__dirname,"../../../","uploads",e,"middlesize",n.name),l=h.join(__dirname,"../../../","uploads",e,"smallsize",n.name);return{small:y.readFileSync(l,"base64"),middle:y.readFileSync(a,"base64"),full:y.readFileSync(t,"base64")}}return null}async function I(e){let t=await _.findOne().where({base_url:e});return JSON.parse(JSON.stringify(t))}module.exports.getOneActual=k,module.exports.getActual=async t=>{let n=[],a=await e.find().where({page_subclass:"current",page_type:"content_page",public_status:"active",lang:t});for(let e=0;e<a.length;e++){const{_id:t,page_title:l,description:i,content_baseUrl:r}=a[e];let s,o=await k(t);null===r&&void 0===r||(s=await B(r)),n.push({id:t,page_title:l,description:i,photo:null!==s?s.full:null,href:o.redirectLink})}return n};