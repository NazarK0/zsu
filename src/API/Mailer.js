"use strict";const e=require("nodemailer");async function t(t,s,a,o,r,c,n){const i={to:s,subject:"Відповідь на запит",text:r},u=e.createTransport({host:"smtp.gmail.com",port:465,secure:!0,auth:{user:o,pass:a}},{from:"Офіційний портал Збройних Сил України <".concat(n.email,">")});await u.sendMail(i)}module.exports={MailSender:t};