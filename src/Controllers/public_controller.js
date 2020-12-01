"use strict";const e=require("path"),n=require("fs"),a=require("moment"),t=require("image-size"),i=require("sharp"),s=require("jimp"),o=require("../Models/SliderNames"),r=require("../Models/FileNames"),d=require("../Models/MainPhoto"),l=require("../Models/Message"),c=require("../Models/Main_Menu"),m=require("../Models/Content"),u=require("../Models/Link"),p=require("../Models/CorpsSign"),y=require("../Models/CorpsBackground"),f=require("../Models/CommandSign"),g=require("../Models/CommandBackground"),_=require("../Models/Contact"),S=require("../Models/CategoryPhoto"),w=require("../API/SubMenuAPI/getAllChildMain"),h=require("../API/isExistHelper"),{getOneElementBody:j,getSideMenu:x,getNews:b,getResultForTroops:k,getResultForCommand:A,getSlidersPhotoPath:M,getFiltersNews:O,getActual:I,getOneActual:C}=require("../API/publicAPI/public"),v=require("../Models/ContentLinks"),B=a(),N=!0;module.exports.getMainMenu=async(e,n)=>{const a=[];try{const e=await c.find().sort({number:1});for(let n=0;n<e.length;n++)e[n].submenu_item=await w(e[n].id),a.push(e[n]);n.set("Access-Control-Allow-Origin","*"),n.json(a)}catch(t){throw new Error(t)}},module.exports.getSideMenu=async(e,n)=>{try{const a=await x(e.params.lang);n.set("Access-Control-Allow-Origin","*"),n.status(200).json(a)}catch(a){throw new Error(a)}},module.exports.getNewsALL=async(e,n)=>{try{const a=await b(e.params.lang);n.set("Access-Control-Allow-Origin","*"),n.status(200).json(a)}catch(a){throw new Error(a)}},module.exports.getFilterNews=async(e,n)=>{console.log("in");try{const{category:a,date:t}=e.query,{lang:i}=e.params,s={category:a,date:t,lang:i},o=await O(s);return n.json(o)}catch(a){n.status(500)}},module.exports.getElementMenuBody=async(e,n)=>{console.log(e.params),n.set("Access-Control-Allow-Origin","*");try{const a=await j(e.params.id);n.status(200).json(a)}catch(a){throw console.log(a),new Error(a)}},module.exports.getElementSideMenu=async(e,n)=>{n.set("Access-Control-Allow-Origin","*");const a={...JSON.parse(JSON.stringify(await m.findOne().where({generated_sidemenu_link:e.params.id})))},t=await M(e,2);a.photo=t,n.status(200).json(a)},module.exports.getNewsOne=async(e,n)=>{n.set("Access-Control-Allow-Origin","*");try{const t=await m.findById(e.params.id),i=await M(e,1);n.status(200).json({title:t.page_title,photo:i,date:a.utc(t.date),html_body:t.html_body,createdAt:t.createdAt})}catch(t){throw new Error(t)}},module.exports.getSocialLinks=async(e,n)=>{n.set("Access-Control-Allow-Origin","*");const a=await u.find();n.status(200).json(a)},module.exports.getAllTroops=async(e,n)=>{try{n.set("Access-Control-Allow-Origin","*");const e=await k();n.status(200).json(e)}catch(a){throw new Error(a)}},module.exports.getContacts=async(e,n)=>{try{const e=(await _.find().select({_id:1,title:2,contact:3,type:4}).lean()).map(({_id:e,title:n,contact:a,type:t})=>{let i="";switch(t){case"mail":i="Пошта";break;case"phone":i="Телефон";break;case"address":i="Адреса";break;default:i=t}return{_id:e,title:n,contact:a,type:i}});n.set("Access-Control-Allow-Origin","*"),n.status(200).json(e)}catch(a){console.error(a)}},module.exports.getAllCommand=async(e,n)=>{try{n.set("Access-Control-Allow-Origin","*");const e=await A();n.status(200).json(e)}catch(a){throw new Error(a)}},module.exports.getContentPicture=async(n,a)=>{const{content:t,type:i,img:s}=n.params,o=e.join(__dirname,"../..","uploads/images",t,i,s);return a.sendFile(o)},module.exports.getCorpsImg=async(n,a,t)=>{const{type:i,name:s}=n.params,o={filename:e.join(__dirname,"../..","uploads/images/corps",i,s)};a.sendFile(s,o,e=>{if(e)try{t(e)}catch(n){}})},module.exports.getCommandImg=async(n,a,t)=>{const{type:i,name:s}=n.params,o={filename:e.join(__dirname,"../..","uploads/images/command",i,s)};a.sendFile(s,o,e=>{if(e)try{t(e)}catch(n){}})},module.exports.getContentFile=async(n,a,t)=>{const{content:i,name:s}=n.params,o={root:e.join(__dirname,"../..","uploads/images",i,"files")};a.sendFile(s,o,e=>{e&&t(e)})},module.exports.getRss=async(n,a)=>a.status(200).sendFile(e.join(__dirname,"../..","public","rss.xml")),module.exports.SaveMessage=async(e,n)=>{const{email:a,text:t}=e.body;return await new l({email:a,text:t,date:B.format("DD-MM-YYYY:HH-mm")}).save(),n.status(200).json({Message:"Good"})},module.exports.postUploadMainPhoto=async(a,s)=>{const o=await a.file,{folder_path:r}=a.body;let l=await d.findOne({base_url:r});if(o){const a=e.join(__dirname,"../..","uploads",r,"fullsize"),c=e.join(__dirname,"../..","uploads",r,"middlesize"),m=e.join(__dirname,"../..","uploads",r,"smallsize"),u=e.join(__dirname,"../..","uploads",r,"960x540");if(n.existsSync(a)){const t=n.readdirSync(a);for(let i=0;i<t.length;i++)n.unlinkSync(e.join(a,t[i]))}else n.mkdirSync(a,{recursive:!0});if(n.existsSync(c)){const a=n.readdirSync(c);for(let t=0;t<a.length;t++)n.unlinkSync(e.join(c,a[t]))}else n.mkdirSync(c,{recursive:!0});if(n.existsSync(m)){const a=n.readdirSync(m);for(let t=0;t<a.length;t++)n.unlinkSync(e.join(m,a[t]))}else n.mkdirSync(m,{recursive:!0});if(n.existsSync(u)){const a=n.readdirSync(u);for(let t=0;t<a.length;++t)n.unlinkSync(e.join(u,a[t]))}else n.mkdirSync(u,{recursive:!0});n.renameSync(e.join(__dirname,"../../uploads/images/temp",o.filename),e.join(__dirname,"../..","uploads",r,"fullsize",o.originalname));const p=e.join(a,o.originalname);t(p,(n,a)=>{if(n)return console.error(n),s.sendStatus(500);i(p).resize({height:parseInt((a.height/2).toString().split(".")[0],10),width:parseInt((a.width/2).toString().split(".")[0],10)}).toFile(e.join(c,o.originalname)).catch(e=>{console.error("Error occured",e)}),i(p).resize({height:parseInt((a.height/4).toString().split(".")[0],10),width:parseInt((a.width/4).toString().split(".")[0],10)}).toFile(e.join(m,o.originalname)).catch(e=>{console.error("Error occured",e)}),i(p).resize({height:540,width:960}).toFile(e.join(u,o.originalname)).catch(e=>{console.error("Error ocurred",e)})}),l?(await d.findByIdAndUpdate(l.id,{name:o.originalname}),l.name=o.originalname):l=await new d({base_url:r,name:o.originalname}).save()}const c=l?l.name:null;return s.send(JSON.stringify({folder:r,filename:c}))},module.exports.postDeleteMainPhoto=async(a,t)=>{const{folder_path:i}=a.body,s=await d.findOne({base_url:i}).select({name:1});if(s)try{n.unlinkSync(e.join(__dirname,"../..","uploads",i,"fullsize",s.name)),n.unlinkSync(e.join(__dirname,"../..","uploads",i,"middlesize",s.name)),n.unlinkSync(e.join(__dirname,"../..","uploads",i,"smallsize",s.name)),n.unlinkSync(e.join(__dirname,"../..","uploads",i,"960x540",s.name)),await d.findOneAndDelete({base_url:i})}catch(o){return console.error(o),t.sendStatus(500)}return t.sendStatus(200)},module.exports.postUploadSlider=async(a,t)=>{const{folder_path:i}=a.body,s=e.join(__dirname,"../..","uploads",i,"sliders");let r=await o.findOne({base_url:i});const d=[],l=await a.files;if(l.length){if(n.existsSync(s)){const a=n.readdirSync(s);for(let t=0;t<a.length;t++)n.unlinkSync(e.join(s,a[t]))}else n.mkdirSync(s,{recursive:!0});l.forEach(a=>{const t="".concat(Math.trunc(1e5*Math.random()),"-").concat(a.originalname);n.renameSync(e.join(__dirname,"../../uploads/images/temp",a.filename),e.join(__dirname,"../..","uploads",i,"sliders",t)),d.push(t)}),r?(await o.findByIdAndUpdate(r.id,{names:d}),r.names=d):r=await new o({names:d,base_url:i}).save()}const c=r?r.names:null,m=r?r.id:null;return t.send(JSON.stringify({folder:i,filenames:c,id:m}))},module.exports.postAddSlider=async(a,t)=>{const{folder_path:i}=a.body,s=await o.findOne({base_url:i}),r=s?s.names:[];if(s&&a.files.length){const d=[];await a.files.forEach(a=>{const t="".concat(Math.trunc(1e5*Math.random()),"-").concat(Date.now());n.renameSync(e.join(__dirname,"../../uploads/images/temp",a.filename),e.join(__dirname,"../..","uploads",i,"sliders",t)),d.push(t)}),r.push(...d),await o.findByIdAndUpdate(s.id,{names:r}).then(()=>t.send(JSON.stringify({folder:i,filenames:r,id:s.id})))}return t.sendStatus(500)},module.exports.postDeleteSliderImage=async(a,t)=>{const{id:i,name:s}=a.params,r=await o.findById(i);if(r){const{names:a,base_url:d}=r,l=a.findIndex(e=>e===s);if(-1!==l){const r=[...a.slice(0,l),...a.slice(l+1)],c=e.join(__dirname,"../..","uploads",d,"sliders");if(r.length)await o.findByIdAndUpdate(i,{names:r}),n.unlinkSync(e.join(c,s));else{await o.findByIdAndDelete(i);n.readdirSync(c).forEach(a=>{n.unlinkSync(e.join(c,a))})}return t.send(JSON.stringify({folder:d,filenames:r}))}}return t.sendStatus(500)},module.exports.postUploadFiles=async(a,t)=>{const{folder_path:i}=a.body,s=e.join(__dirname,"../..","uploads",i,"files");let o=await r.findOne({base_url:i});const d=[];if(a.files.length){if(n.existsSync(s)){const a=n.readdirSync(s);for(let t=0;t<a.length;t++)n.unlinkSync(e.join(s,a[t]))}else n.mkdirSync(s,{recursive:!0});await a.files.forEach(a=>{const t="".concat(Math.trunc(1e5*Math.random()),"-").concat(a.originalname);n.renameSync(e.join(__dirname,"../../uploads/images/temp",a.filename),e.join(__dirname,"../..","uploads",i,"files",t)),d.push(t)}),o?(await r.findByIdAndUpdate(o.id,{names:d}),o.names=d):o=await new r({names:d,base_url:i}).save()}const l=o?o.names:null,c=o?o.id:null;return t.send(JSON.stringify({filenames:l,id:c}))},module.exports.postAddFiles=async(a,t)=>{const{folder_path:i}=a.body,s=await r.findOne({base_url:i}),o=s?s.names:[];if(s&&a.files.length){const d=[];return await a.files.forEach(a=>{const t="".concat(Math.trunc(1e5*Math.random()),"-").concat(a.originalname);n.renameSync(e.join(__dirname,"../../uploads/images/temp",a.filename),e.join(__dirname,"../..","uploads",i,"files",t)),d.push(t)}),o.push(...d),await r.findByIdAndUpdate(s.id,{names:o}),t.send(JSON.stringify({filenames:o,id:s.id}))}return t.sendStatus(500)},module.exports.postDeleteFile=async(a,t)=>{const{id:i,name:s}=a.params,d=await r.findById(i);if(d){const{names:a,base_url:l}=d,c=a.findIndex(e=>e===s);if(-1!==c){const d=[...a.slice(0,c),...a.slice(c+1)],m=e.join(__dirname,"../..","uploads",l,"files");if(d.length)await r.findByIdAndUpdate(i,{names:d}),n.unlinkSync(e.join(m,s));else{await o.findByIdAndDelete(i);n.readdirSync(m).forEach(a=>{n.unlinkSync(e.join(m,a))})}return t.send(JSON.stringify({filenames:d}))}}return t.sendStatus(500)},module.exports.postSendCorpsBG=async(a,t)=>{const i=e.join(__dirname,"../..","uploads/images/corps/bg");if(n.existsSync(i)||n.mkdirSync(i,{recursive:!0}),a.files){const t=await a.files;for(const a of t){const t="".concat(Math.trunc(1e4*Math.random()),"-").concat(a.originalname);n.renameSync(e.join(__dirname,"../../uploads/images/temp",a.filename),e.join(i,t)),await new y({name:t,url:e.join(i,t),base64:n.readFileSync(e.join(i,t),"base64")}).save()}}const s=await y.find().select({_id:1,base64:2}).lean();return t.send(JSON.stringify(s))},module.exports.postDeleteCorpsBG=async(a,t)=>{const{id:i}=a.params,s=await y.findByIdAndDelete(i);if(s)try{n.unlinkSync(e.join(__dirname,"../..","uploads/images/corps/bg",s.name))}catch(r){console.error(r)}const o=await y.find().select({_id:1,base64:2}).lean();return t.send(JSON.stringify(o))},module.exports.postSendCorpsSign=async(a,t)=>{const i=e.join(__dirname,"../..","uploads/images/corps/sign");if(n.existsSync(i)||n.mkdirSync(i,{recursive:!0}),a.files){const t=await a.files;for(const a of t){const t="".concat(Math.trunc(1e4*Math.random()),"-").concat(a.originalname);n.renameSync(e.join(__dirname,"../../uploads/images/temp",a.filename),e.join(i,t)),await new p({name:t,url:e.join(i,t),base64:n.readFileSync(e.join(i,t),"base64")}).save()}}const s=await p.find().select({_id:1,base64:2}).lean();return t.send(JSON.stringify(s))},module.exports.postDeleteCorpsSign=async(a,t)=>{const{id:i}=a.params,s=await p.findByIdAndDelete(i);if(s)try{n.unlinkSync(e.join(__dirname,"../..","uploads/images/corps/sign",s.name))}catch(r){console.error(r)}const o=await p.find().select({_id:1,base64:2}).lean();return t.send(JSON.stringify(o))},module.exports.postSendCommandBG=async(a,t)=>{const i=e.join(__dirname,"../..","uploads/images/command/bg");if(n.existsSync(i)||n.mkdirSync(i,{recursive:!0}),a.files){const t=await a.files;for(const a of t){const t="".concat(Math.trunc(1e4*Math.random()),"-").concat(a.originalname);n.renameSync(e.join(__dirname,"../../uploads/images/temp",a.filename),e.join(i,t)),await new g({name:t,url:e.join(i,t),base64:n.readFileSync(e.join(i,t),"base64")}).save()}}const s=await g.find().select({_id:1,base64:2}).lean();return t.send(JSON.stringify(s))},module.exports.postDeleteCommandBG=async(a,t)=>{const{id:i}=a.params,s=await g.findByIdAndDelete(i);if(s)try{n.unlinkSync(e.join(__dirname,"../..","uploads/images/command/bg",s.name))}catch(r){console.error(r)}const o=await g.find().select({_id:1,base64:2}).lean();return t.send(JSON.stringify(o))},module.exports.postSendCommandSign=async(a,t)=>{const i=e.join(__dirname,"../..","uploads/images/command/sign");if(n.existsSync(i)||n.mkdirSync(i,{recursive:!0}),a.files){const t=await a.files;for(const a of t){const t="".concat(Math.trunc(1e4*Math.random()),"-").concat(a.originalname);n.renameSync(e.join(__dirname,"../../uploads/images/temp",a.filename),e.join(i,t)),await new f({name:t,url:e.join(i,t),base64:n.readFileSync(e.join(i,t),"base64")}).save()}}const s=await f.find().select({_id:1,base64:2}).lean();return t.send(JSON.stringify(s))},module.exports.postDeleteCommandSign=async(a,t)=>{const{id:i}=a.params,s=await f.findByIdAndDelete(i);if(s)try{n.unlinkSync(e.join(__dirname,"../..","uploads/images/command/sign",s.name))}catch(r){console.error(r)}const o=await f.find().select({_id:1,base64:2}).lean();return t.send(JSON.stringify(o))},module.exports.postAddCategoryPhoto=async(a,t)=>{const i=e.join(__dirname,"../..","uploads/images/category");if(n.existsSync(i)||n.mkdirSync(i,{recursive:!0}),a.files){const t=await a.files;for(const a of t){const t="".concat(Math.trunc(1e4*Math.random()),"-").concat(a.originalname);n.renameSync(e.join(__dirname,"../../uploads/images/temp",a.filename),e.join(i,t)),await new S({name:t,url:e.join(i,t),base64:n.readFileSync(e.join(i,t),"base64")}).save()}}const s=await S.find().select({_id:1,base64:2}).lean();return t.send(JSON.stringify(s))},module.exports.Update=async(e,n)=>{JSON.parse(JSON.stringify(await m.find())).forEach(async e=>{await m.findByIdAndUpdate({_id:e._id},{$set:{public_status:"active"}})}),n.json(!0)},module.exports.postSetLinkImg=async(a,t)=>{const i=await a.file;let{linkId:o}=a.body;const r=e.join(__dirname,"../..","uploads","/images/links");let d;if((await u.find({title_ua:void 0,tilte_en:void 0}).lean()).forEach(({img:a})=>{n.unlinkSync(e.join(r,a))}),await u.deleteMany({title_ua:void 0}),i){const a=e.extname(i.originalname);o||(d=await(new u).save(),o=d.id),n.existsSync(r)||n.mkdirSync(r,{recursive:!0});const{isImgExist:l,filename:c}=h(o,r);l&&n.unlinkSync(e.join(r,c));const m="".concat(o,"-").concat(Date.now()).concat(a);return s.read(e.join(__dirname,"../../uploads/images/temp",i.filename)).then(n=>n.cover(300,200).quality(60).write(e.join(r,m))).then(()=>n.unlinkSync(e.join(__dirname,"../../uploads/images/temp",i.filename))),await u.findByIdAndUpdate(o,{img:m}),t.send(JSON.stringify({img:m,id:o}))}return t.sendStatus(404)},module.exports.postDeleteLinkImg=async(a,t)=>{const{id:i}=a.params,s=e.join(__dirname,"../..","uploads","/images/links"),o=n.readdirSync(s).find(e=>e.includes(i));o?(n.unlinkSync(e.join(s,o)),await u.findByIdAndUpdate(i,{img:""}),t.sendStatus(200)):t.sendStatus(404)},module.exports.getLinkPicture=async(n,a,t)=>{const{img:i}=n.params,s=e.join(__dirname,"../..","uploads/images/links",i);a.sendFile(s,e=>{t(e)})},module.exports.postSendContentLinks=async(e,n)=>{const{folder_path:a,user_links:t,user_pages:i,directLink:s}=e.body,o=await v.findOne({base_url:a});return o?(await v.findByIdAndUpdate(o.id,{links:{contacts:t,pages:i,directLink:s.trim()}}),n.sendStatus(200)):(await new v({base_url:a,links:{contacts:t,pages:i,directLink:s.trim()}}).save(),n.sendStatus(200))},module.exports.getActualContent=async(e,n)=>{try{let a=await I(e.params.lang);return console.log(a,"result"),n.json(a)}catch(a){console.log(a),n.status(500).json("Public Exception, Wrong actual content")}},module.exports.getOneActualContent=async(e,n)=>{try{let a=await C(e.params.id);n.json(a)}catch(a){console.log(a),n.status(500).json("Server Error")}},module.exports.getContentPage=async(e,n)=>{try{let a=await m.findById(e.params.id);n.json(a)}catch(a){n.status(500).json("Server Internal Error")}};