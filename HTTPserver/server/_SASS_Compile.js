// compile SASS, to /client/css/  

var sass = require('node-sass');
var fs = require("fs");
// sass.render({
//   file: scss_filename,
//   [, options..]
// }, function(err, result) { /*...*/ });
// OR

// var result = sass.renderSync({
//   data: scss_content
//   [, options..]
// });

exports.compile = function(){
	sass.render({
	  file: "./SASS/index.sass",
	  outFile : "./cleint/css/hireBrent.css"
	}, function(err, result) {
		if(err){
			console.log(err);
		}
		var thisResult =  new Buffer(result.css, 'utf8').toString('ascii'); 
		try{
			fs.writeFile("./client/css/hireBrent.css", thisResult, function(err){
			        if(!err){
			          console.log("Converted SASS to  CSS written");
			        }
			  	});
		}catch(exception){
			console.log("WTF");
		}
	});		
};