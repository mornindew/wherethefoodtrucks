'use strict';
let  API = require("../server/API_Post");

API.fetchAll_techSkills(function( skill_items ){
	 exports = skill_items;
	 console.log("Has Tech Skills  Items  :  "+exports.length);
});
