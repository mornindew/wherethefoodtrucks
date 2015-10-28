var mongoose = require("mongoose");

// create Schema
	var Education_Schema = new mongoose.Schema({
		school: {
			type : String,
			required: true
		},
		icon: {
			type : String,
			required: false
		},
		duration: {
			type : String,
			required: false
		},
		images: {
			type : Array,
			required: false
		},
		extra : {
			type: Array,
			required : false,
		},
	});

//// Export Model Schema
	module.exports = Education_Schema;