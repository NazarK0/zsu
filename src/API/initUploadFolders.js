"use strict";const e=require("fs"),s=require("./constants/uploadPaths");module.exports=()=>{Object.values(s).forEach(s=>{e.existsSync(s)||e.mkdirSync(s,{recursive:!0})})};