"use strict";function e(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function t(t){for(var i=1;i<arguments.length;i++){var s=null!=arguments[i]?arguments[i]:{};i%2?e(Object(s),!0).forEach((function(e){r(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):e(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}function r(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const i=require("../Models/History"),s=require("../Models/User"),n=require("../API/getAdminid"),d=require("../API/op_categories"),o=require("../API/Converter"),{ValidSession:a}=require("../API/Session/session");module.exports.getSettingsPage=async(e,r)=>{const i=await s.findById(n.getId(e));return!0===await a(e.session,i.id,r)?r.render("main_menu_settings",t(t({},i.settings.recordsPerPage),{},{user:i.id})):null===await a(e.session,i.id,r)?r.redirect("/admin/login"):r.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:i.id})},module.exports.postRPPContacts=async(e,t)=>{const r=await s.findById(n.getId(e));if(!0===await a(e.session,r.id,t)){const{set_rpp_contacts:i}=e.body,{recordsPerPage:n}=r.settings;return n.contacts=i,await s.findByIdAndUpdate(r.id,{settings:{recordsPerPage:n}}),t.redirect("..")}return null===await a(e.session,r.id,t)?t.redirect("/admin/login"):t.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:r.id})},module.exports.postRPPCorps=async(e,t)=>{const r=await s.findById(n.getId(e));if(!0===await a(e.session,r.id,t)){const{set_rpp_corps:i}=e.body,{recordsPerPage:n}=r.settings;return n.corps=i,await s.findByIdAndUpdate(r.id,{settings:{recordsPerPage:n}}),t.redirect("..")}return null===await a(e.session,r.id,t)?t.redirect("/admin/login"):t.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:r.id})},module.exports.postRPPLinks=async(e,t)=>{const r=await s.findById(n.getId(e));if(!0===await a(e.session,r.id,t)){const{set_rpp_links:i}=e.body,{recordsPerPage:n}=r.settings;return n.links=i,await s.findByIdAndUpdate(r.id,{settings:{recordsPerPage:n}}),t.redirect("..")}return null===await a(e.session,r.id,t)?t.redirect("/admin/login"):t.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:r.id})},module.exports.postRPPNews=async(e,t)=>{const r=await s.findById(n.getId(e));if(!0===await a(e.session,r.id,t)){const{set_rpp_news:i}=e.body,{recordsPerPage:n}=r.settings;return n.news=i,await s.findByIdAndUpdate(r.id,{settings:{recordsPerPage:n}}),t.redirect("..")}return null===await a(e.session,r.id,t)?t.redirect("/admin/login"):t.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:r.id})},module.exports.postRPPPages=async(e,t)=>{const r=await s.findById(n.getId(e));if(!0===await a(e.session,r.id,t)){const{set_rpp_pages:i}=e.body,{recordsPerPage:n}=r.settings;return n.pages=i,await s.findByIdAndUpdate(r.id,{settings:{recordsPerPage:n}}),t.redirect("..")}return null===await a(e.session,r.id,t)?t.redirect("/admin/login"):t.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:r.id})},module.exports.postRPPSidemenu=async(e,t)=>{const r=await s.findById(n.getId(e));if(!0===await a(e.session,r.id,t)){const{set_rpp_sidemenu:i}=e.body,{recordsPerPage:n}=r.settings;return n.sidemenu=i,await s.findByIdAndUpdate(r.id,{settings:{recordsPerPage:n}}),t.redirect("..")}return null===await a(e.session,r.id,t)?t.redirect("/admin/login"):t.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:r.id})},module.exports.postRPPHistory=async(e,t)=>{const r=await s.findById(n.getId(e));if(!0===await a(e.session,r.id,t)){const{set_rpp_history:i}=e.body,{recordsPerPage:n}=r.settings;return n.history=i,await s.findByIdAndUpdate(r.id,{settings:{recordsPerPage:n}}),t.redirect("..")}return null===await a(e.session,r.id,t)?t.redirect("/admin/login"):t.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:r.id})},module.exports.postRPPUsers=async(e,t)=>{const r=await s.findById(n.getId(e));if(!0===await a(e.session,r.id,t)){const{set_rpp_users:i}=e.body,{recordsPerPage:n}=r.settings;return n.users=i,await s.findByIdAndUpdate(r.id,{settings:{recordsPerPage:n}}),t.redirect("..")}return null===await a(e.session,r.id,t)?t.redirect("/admin/login"):t.status(400).render("infopage",{info:"Даний користувач авторизований в системі, використайте інший обліковий запис!",url:"/admin/login",url_text:"Повернутися до форми авторизації",user:r.id})};