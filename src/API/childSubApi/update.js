"use strict";const d=require("../../Models/ChildSub"),e=require("../../Models/Submenu");module.exports.updateChildOfChild=async e=>{const i=await d.find({parent_childSub:e});await d.findByIdAndUpdate(e,{child:i})};