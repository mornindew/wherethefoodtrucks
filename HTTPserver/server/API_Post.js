'use strict';
let http = require("http");


exports.isAPI_up = function(callbackWith_trueOrFalse){
	let API_URL = "http://localhost:1337/education"
	http.get(API_URL, function(res){
			    var body = '';

			    res.on('data', function(chunk){
			        body += chunk;
			    });

			    res.on('end', function(){
			        let rtnValue = null;
			        let ResponseArray = JSON.parse(body);
			        // console.log("response Length: ", ResponseArray.length);
			        // console.log("Type Of        : ", typeof ResponseArray);
			        // console.log("First: ", ResponseArray[0].school);
			        // callback_WithArray( ResponseArray )
			        if(ResponseArray.length >= 1){
			        	rtnValue = true;
			        }else{
			        	rtnValue = false;
			        }
			        // console.log(ResponseArray);
			        callbackWith_trueOrFalse(rtnValue);
			    });
	}).on('error', function(e){
	      console.log("Got an error: ", e);
	});
};


//Returns String of All Education Items From API
	exports.fetchAll_education = function(callback_WithArray){
		let url = 'http://localhost:1337'+'/education';
		
		http.get(url, function(res){
				    var body = '';

				    res.on('data', function(chunk){
				        body += chunk;
				    });

				    res.on('end', function(){
				        var ResponseArray = JSON.parse(body);
				        // console.log("response Length: ", ResponseArray.length);
				        // console.log("Type Of        : ", typeof ResponseArray);
				        // console.log("First: ", ResponseArray[0].school);
				        callback_WithArray( ResponseArray )
				    });
		}).on('error', function(e){
		      console.log("Got an error: ", e);
		});
	};

	exports.fetchAll_techSkills = function(callback_WithArray){
		let url = 'http://localhost:1337'+'/techSkills';
		
		http.get(url, function(res){
				    var body = '';

				    res.on('data', function(chunk){
				        body += chunk;
				    });

				    res.on('end', function(){
				        var Response = JSON.parse(body);
				        // console.log("response Length: ", ResponseArray.length);
				        // console.log("Type Of        : ", typeof ResponseArray);
				        // console.log("First: ", ResponseArray[0].school);
				        callback_WithArray( Response )
				    });
		}).on('error', function(e){
		      console.log("Got an error: ", e);
		});
	};

	exports.fetchAll_workExp = function(callback_WithArray){
		let url = 'http://localhost:1337'+'/workExp';
		
		http.get(url, function(res){
				    var body = '';

				    res.on('data', function(chunk){
				        body += chunk;
				    });

				    res.on('end', function(){
				        var ResponseArray = JSON.parse(body);
				        // console.log("response Length: ", ResponseArray.length);
				        // console.log("Type Of        : ", typeof ResponseArray);
				        // console.log("First: ", ResponseArray[0].school);
				        callback_WithArray( ResponseArray )
				    });
		}).on('error', function(e){
		      console.log("Got an error: ", e);
		});
	};
	exports.fetchAll_socialLinks = function(callback_WithArray){
		let url = 'http://localhost:1337'+'/socialLinks';
		
		http.get(url, function(res){
				    var body = '';

				    res.on('data', function(chunk){
				        body += chunk;
				    });

				    res.on('end', function(){
				        var ResponseArray = JSON.parse(body);
				        // console.log("response Length: ", ResponseArray.length);
				        // console.log("Type Of        : ", typeof ResponseArray);
				        // console.log("First: ", ResponseArray[0].school);
				        callback_WithArray( ResponseArray )
				    });
		}).on('error', function(e){
		      console.log("Got an error: ", e);
		});
	};
	exports.fetch_brentContactInfo = function(callback_WithArray){
		let url = 'http://localhost:1337'+'/contactInfo';
		
		http.get(url, function(res){
				    var body = '';

				    res.on('data', function(chunk){
				        body += chunk;
				    });

				    res.on('end', function(){
				        var ResponseArray = JSON.parse(body);
				        callback_WithArray( ResponseArray[0] )
				    });
		}).on('error', function(e){
		      console.log("Got an error: ", e);
		});
	};