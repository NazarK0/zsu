"use strict";const e=require("nodemailer");async function t(t,s,r,a,o,c,i){const n={to:s,subject:"Відповідь на запит",text:o},u=e.createTransport({host:"smtp.gmail.com",port:465,secure:!0,auth:{user:a,pass:r}},{from:`Офіційний портал Збройних Сил України <${i.email}>`});await u.sendMail(n)}module.exports={MailSender:t};