"use strict";const e=require("../../Models/Submenu"),d=require("../../Models/ChildSub");module.exports.updateChildOfSub=async i=>{const s=await d.find().where(parent_sub);await e.findByIdAndUpdate({_id:i},{$set:{chikd_sub:s}})};