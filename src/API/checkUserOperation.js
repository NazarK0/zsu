"use strict";function e(e){let t=[];return delete e[0],e.forEach(e=>{t.push(e.name)}),t}module.exports.getOperation=t=>{let n=[];return t.forEach(r=>{if("ALL"===r.name&&"on"===r.value)return n=e(t),r;"on"===r.value&&n.push(r.name)}),n};