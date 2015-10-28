"use strict";
let fs = require("fs");
let path = require("path");
let http = require("http");
let https = require("https");

exports.request = function(reqURL, callbackWith_JSON){
	let API_URL = reqURL;
	http.get(API_URL, function(res){
			    var body = '';
			    res.on('data', function(chunk){
			        body += chunk;
			    });
			    res.on('end', function(){
			        let rtnValue = null;
			        let ResponseArray = JSON.parse(body);
			        // console.log(ResponseArray);
			        callbackWith_JSON(ResponseArray);
			    });
	}).on('error', function(e){
	      console.log("Got an error: ", e);
	});
};
exports.requestHTTPS = function(reqURL, callbackWith_JSON){
	let API_URL = reqURL;
	https.get(API_URL, function(res){
			    var body = '';
			    res.on('data', function(chunk){
			        body += chunk;
			    });
			    res.on('end', function(){
			        let rtnValue = null;
			        let ResponseArray = JSON.parse(body);
			        // console.log(ResponseArray);
			        callbackWith_JSON(ResponseArray);
			    });
	}).on('error', function(e){
	      console.log("Got an error: ", e);
	});
};


exports.serializeJSON = function(obj){
	  var str = [];
	  for(var p in obj)
	    if (obj.hasOwnProperty(p)) {
	      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	    }
	  return str.join("&");
};

let logFilePath = "./Logs_HTTPserver.txt";
exports.logFile = function(msg){
	fs.writeFile('helloworld.txt', 'Hello World!', function (err) {
		if (err) return console.log(err);
		console.log('Hello World > helloworld.txt');
	});
};

exports.readFile = function( path2File ){
	let realPath2File = path.join(__dirname, "../", path2File);
	console.log( realPath2File );
	fs.readFile(realPath2File, "utf8", function(err, data){
		if(err){
			console.log(err);
			throw err;
		} 
		console.log(data);
	});
};