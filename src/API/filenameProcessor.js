"use strict";const e=require("path"),r=require("moment");module.exports=t=>{const{name:n,ext:s}=e.parse(t);return`${n}-${r().unix()}${s}`};