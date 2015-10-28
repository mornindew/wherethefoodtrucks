//////
// This is a wrapper around many basic BASH commands..
    var exec = require('child_process').exec;

//// Run a BASH command - callback receives stdout..     
    exports.run = function(command, callback) {
        exec(command, function(error, stdout, stderr) {
            if(error) throw error;
            if(stdout) console.log(stderr);
            
            callback(stdout);
        });
    };

//// Basic bash wrappers..
/// ls 
    exports.ls = function(callback) { /// callback has array of items
        exports.run("ls -1 -p", function(out) {
            var items = (out.split("\n")).filter(Boolean); /// make array and remove empty strings.. 
            if (callback) {
                callback(items);
            };
        });
    };

/// mkdir 
    exports.mkdir = function(path, callback) { /// callback has array of items
        exports.run("mkdir "+path, function(out) {
            // var items = (out.split("\n")).filter(Boolean); /// make array and remove empty strings.. 
            var parsedPath = (path.split("/server/")  )[1]; 
            if (callback) {
                callback("\n      Successfully Created Directory:\n  "+parsedPath+"/");
            };
        });
    };

/// touch 
    exports.touch = function(path, callback) { /// callback has array of items
        exports.run("touch "+path, function(out) {
            // var items = (out.split("\n")).filter(Boolean); /// make array and remove empty strings.. 
            
            if (callback) {
                callback(items);
            };
        });
    };

/// ls  Directory 
    exports.lsDir = function(path, callback) { /// callback has array of items
        // exports.run("ls -1 -p", function(out) {
        exports.run("ls "+path+" -p", function(out) {
            var items = (out.split("\n")).filter(Boolean); /// make array and remove empty strings.. 
            if (callback) {
                callback(items);
            };
        });
    };

///// Print Working Directory..  //  callback gets string of dir
    exports.pwd = function(callback) { /// callback has array of items
        exports.run("pwd", function(out) {
            var dirString = (out.split("\n")).filter(Boolean); /// make array and remove empty strings.. 

            if (callback) {
                callback(dirString);
            };
        });
    };
    /// Use 
   //  	bash.pwd(function(dir){
		// 	console.log("PWD");
		// 	console.log(dir);
		// });