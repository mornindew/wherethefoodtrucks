var mongoose = require("mongoose");

// create Schema
	var ContactInfo_Schema = new mongoose.Schema({
		email : {
			type : String,
			required: true
		},
		description: {
			type : String,
			required: false
		},
		avatarSRC: {
			type : String,
			required: false
		},
		fname : {
			type : String,
			required: false
		},
		lname : {
			type : String,
			required: false
		},
		generalLocation : {
			type : String,
			required: false
		},
		jobTitle : {
			type : String,
			required: false
		},
	});

//// Export Model Schema
	module.exports = ContactInfo_Schema;