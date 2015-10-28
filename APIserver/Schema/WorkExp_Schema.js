var mongoose = require("mongoose");

// create Schema
	var WorkExp_Schema = new mongoose.Schema({
		company: {
			type : String,
			required: true
		},
		icon: {
			type : String,
			required: false
		},
		imgs : {
			type : Array,
			required: false	
		},
		workDuration : {
			type : String,
			required: false
		},
		positionTitle : {
			type : String,
			required: false
		},
		contact : {
			type : Object,
			required: false
		},
	});

//// Export Model Schema
	module.exports = WorkExp_Schema;