"use strict";const e=require("../../Models/Sidemenu"),r=async()=>{let r=await e.find();return JSON.parse(JSON.stringify(r))};module.exports=r;