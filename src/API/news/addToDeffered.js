"use strict";const e=require("moment"),t=require("../../Models/News"),i=require("../../Models/PublishTime");module.exports=async function(a,s){if(s){const d=e(s,"DD.MM.YYYY, HH:mm").valueOf();let n="active";if(d>=e().valueOf()){n="deffered";const t=await i.findOne({news_id:a}),s=e(d).startOf("minutes").valueOf();t?await i.findByIdAndUpdate(t.id,{timestamp:s}):await new i({timestamp:s,news_id:a}).save()}await t.findByIdAndUpdate(a,{publishDate:e(d).toISOString(),public_status:n})}else await t.findByIdAndUpdate(a,{publishDate:e().toISOString(),public_status:"active"})};