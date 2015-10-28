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
