// curl -i -H "Accept: application/json" -H "Content-Type: application/json" localhost/resource
// curl --data "param1=value1&param2=value2" http://hostname/resource
"use strict";

let api_PORT = 1337;

let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let methodOverride = require("method-override");
let _ = require("lodash");

let path = require("path");
let tools = require("../server/Tools_nodeJS_server.js");
	tools.readFile("API_Server/testFile.txt");


let app = express();

let listenOnPort = function(){
		/// listen on port
			console.log("Listening on port :"+api_PORT);
			app.listen( api_PORT );
};

//// Middle-Ware  Needed for REST API
	app.use( bodyParser.urlencoded({extended: true}) );
	app.use( bodyParser.json() );
	app.use( methodOverride("X-HTTP-Method-Override") );


//// CORS - Cross Origin Resourse Sharing - Support
	app.use(function(req, res, next){
		res.header("Access-Controll-Allow-Origin","*");
		res.header("Access-Controll-Allow-Origin", "GET,PUT,POST,DELETE");
		res.header("Access-Controll-Allow-Origin", "Content-Type");
		next();
	});

/// Connect to Database..
	let connectionString = "mongodb://localhost/lucentLight";
	mongoose.connect(connectionString);
	mongoose.connection.once("open", function(){
		
		/// Load the models
			app.models = require("./Schema/allModels");

		/// Log Incoming GET Request
			app.use(function(req, res, next) {
			  if(req.method === "GET"){
			    let ip = req.headers['x-forwarded-for'] || 
					     req.connection.remoteAddress || 
					     req.socket.remoteAddress ||
					     req.connection.socket.remoteAddress;

			  	console.log("_____________________________");
			  	console.log("###  NEW API GET REQUEST ###");
			    console.log('%s %s', "  Fetching JSON : ", req.url);
				console.log("             IP : "+ip);	     
			    // console.log( Object.keys(req) );
			  }else if(req.method === "POST"){
			  	///
			  }
			  next();
			});

		/// Register Each Controller for each Route
			let routes = require("./routes");  /// ALL ROUTES for API
			_.each(routes, function(controller, route){
				app.use(route, controller(app, route));
			});

		//// Listen on Set Port
			listenOnPort();	
	});

module.exports = app;
