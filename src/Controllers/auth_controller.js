"use strict";const e=require("../Models/User"),s=require("../API/hashing_password"),i=require("../API/getAdminid"),o=require("../API/op_categories"),{CreateSession:n}=require("../API/Session/session");module.exports.getLoginPage=async(s,i)=>{let o=await e.findOne({login:"SystemUser"});!1===Boolean(o)?await a(s,i):(i.status(200),i.render("login"))},module.exports.login=async(i,o)=>{try{const a=await e.findOne({login:i.body.login});if(a){const e=s.hashpassword(i.body.password);a.password===e?(await n(i.session,a.id),o.redirect(`/admin/${a.id}/main`)):o.status(400).render("infopage",{url:"/admin/login",url_text:"Повернутися до форми авторизації",info:"Невірно введений пароль!"})}else o.status(400).render("infopage",{url:"/admin/login",url_text:"Повернутися до форми авторизації",info:"Такого користувача не існує!"})}catch(a){console.log(a)}};const a=async(i,n)=>{console.log();const a=new e({login:"SystemUser",email:"testmail",password:s.hashpassword("102030405000"),type:"system_user",operation:[...Object.values(o)],creator:{id:"SYSTEM",login:"Система"}});await a.save(),n.redirect("/admin/login")};