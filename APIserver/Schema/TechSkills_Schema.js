var mongoose = require("mongoose");

// create Schema
	var TechSkills_Schema = new mongoose.Schema({
		name: {
			type : String,
			required: true
		},
		description: {
			type : String,
			required: false
		},
		url: {
			type : String,
			required: false
		},
		imgSRC: {
			type : Array,
			required: false
		},
	});

//// Export Model Schema
	module.exports = TechSkills_Schema;