"use strict";const s=require("crypto");module.exports.hashpassword=e=>s.createHash("sha256").update(e).digest("base64");