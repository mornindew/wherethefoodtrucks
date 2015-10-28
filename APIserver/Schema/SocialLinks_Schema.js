var mongoose = require("mongoose");

// create Schema
	var SocialLinks_Schema = new mongoose.Schema({
		name: {
			type : String,
			required: true
		},
		url: {
			type : String,
			required: true
		},
		description : {
			type : String,
			required: false
		},
		iconSRC : {
			type : String,
			required: false
		},
	});

//// Export Model Schema
	module.exports = SocialLinks_Schema;