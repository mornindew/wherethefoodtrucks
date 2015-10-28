
/////// Dependancies & Tools
	/// Wrapper around node-core  child_process.exec  
		var bash = require('./server/bash.js');
		var logs = require("./_GRUNT_TOOLS/grunt_logging.js").logs;

/////////////////////////////////////////
/////  Gruntfile.js   Configuration.. 
module.exports = function(grunt){
	grunt.initConfig({
	  sass: {                              // Task
	    dist: {                            // Target
	      options: {                       // Target options
	        style: 'compressed'
	      },
	      files: {                         // Dictionary of files
	        'client/css/hireBrent33.css': 'SASS/index.sass',       // 'destination': 'source'
	      },
	    }
	  },
	  express : {
	  	options :{},
	  	dev : {
	      options: {
	        script: './StartApp.sh'
	      },
	    },
	  	prod: {
	      options: {
	        script: './StartApp.sh'
	      },
	    },
	  	test: {
	      options: {
	        script: './RunTest.sh'
	      },
	    },
	  },
	  /// Watch For Client/ Public Changes and tell Connected Clients to Reload Window , on public/Dir update
	  watch : {
	  	options: {
	  		livereload : true,  /// any dirs below are updated ,  force client to reload / new GET request..
	  	}, 
	  	sass : {
		  	files : "SASS/*.sass",
		  	tasks : ["sass","logs_updated_SASS"],  // compile then log . connected clients will reload DOM..
	  	},
	  	views : {
		  	files : ["Views/*.jade","Views/partials/*.jade","Views/partials/Resume/*.jade","Views/partials/Resume/Pages/*.jade"],
		  	tasks : ["logs_updated_VIEW"],
	  	},
	  	modelDataUpdate : {
		  	files : "Models/*.js",
		  	tasks : ["logs_updated_MODELS"],
	  	},
	  	publicUpdate : {
		  	files : [ 'client/js/*.js', 'client/js/Vendor/*.js', 'client/css/*.css' ],
		  	tasks : ["logs_updated_PUBLIC"],
	  	},
	  	/// Watch And Restart Server Process..
	  	express : {
		    files:  [ 'Models/*.js' ],
		    tasks:  [ 'logs_updated_MODELS','express:dev' ],
		    options: {
		      spawn: true
		    }
  		},
	  },

	});

	//////////////////////
	////    GruntJS-CORE  TASKS   --  Compile SASS, Watch DIR for updates
		grunt.loadNpmTasks('grunt-contrib-sass');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-express-server');

	///////////////////////////////////////
	/// Register Custom Tasks
		
		/////////////////////////////////////////////////
		///   Show Man Page 
			/// Register Loggin Events.
				grunt.registerTask('man',                 logs.manPage);
				grunt.registerTask('appTitle',            logs.appTitle);
				grunt.registerTask('logs_updated_SASS',   logs.updated_SASS );
				grunt.registerTask('logs_updated_VIEW',   logs.updated_SASS );
				grunt.registerTask('logs_updated_PUBLIC',   logs.updated_SASS );
				grunt.registerTask('logs_updated_MODELS',   logs.updated_MODELS );
			/// all logs events
				grunt.registerTask("allLogs", ['logs_updated_SASS','logs_updated_VIEW','logs_updated_PUBLIC','logs_updated_MODELS']);
				


	// Run Multiple Tasks
		grunt.registerTask("both",    ["info", "sayHello"]);


	////  DEFAULT  
	// fallback Default task  for when just running grunt with no param
		grunt.registerTask('default', ["appTitle", "watch"]);
};