#!/usr/local/bin/node

'use strict';



let consolidate = require('consolidate');
let API_Interface = require("./server/API_Post.js");
let Models = null;
/// Check that API server is running.. 
    API_Interface.isAPI_up(function(answer){
        console.log("Is API Running : "+answer);
        if(answer === true){
            /////  Init Models
            let Models = require("./Models/All_Model_Data.js"); 
        }else{
            console.error("###  Unable to connect to API");
            throw error
        }
    });


/////////////////
////  Dependancies 
let express = require("express");
let path = require('path');
let fs = require('fs');

let app = express();
let SERVER = require('http').Server(app);
let io = require('socket.io')(SERVER);



let compress = require('compression');
let favicon = require('serve-favicon');
let jade = require("jade");

//// Build SASS into  CSS
let compileSass = require("./server/_SASS_Compile.js");
// compileSass.compile();
/**
 * API keys and Passport configuration.
 */
let secrets = require('./config/secrets');
let passportConf = require('./config/passport');

///////////////
//// Compile Views... 
let CompileViews = {};
//// Build a View   by running function and passing Object of Model Data..
// CompileViews.index({AppTitle: "Sweet App Title"});


//////////////////////
/////  Server Side Mudules  - My Server Side NameSpaces..  
// let tools = require("./server/_JS_Tools.js");
    let watchingDIR = require("./server/watching.js");



/////////////////////////////////
//////// Set up  app.local    Object	 
    app.locals.title = "Lucent Light";
    app.locals.email = "adeptPro33@gmail.com";

//// HOSTING CONFIG 
    let HOST = "localhost";



let PORT = app.locals.serverPort = (80 || 1337);


/////////////////////////////////
///    Middle Ware   --- Handle incoming Get Requst 

app.use(compress());
// app.use( express.static( "./client", { maxAge: 31557600000 } ));
app.use(express.static("./client", {
    maxAge: 10
}));

app.use(favicon('./client/img/torch.png'));

///////////////////////////////
///   Views   
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'jade');

////////////////////////////////
///  Grab All Model Data..  
//////////////////////////////////////////////////////////////////
// respond with "hello world" when a GET request is made to the homepage
    ////////=============================
    // ROUTE of HTTP Web Server..   //// serve Everything by default... 
        app.get('/', function(req, res) {
            console.log("##  Fetchin MODEL DATA");
            try{
                let models_brent = require("./Models/All_Model_Data.js").brentLinhardt();
                // let indexView_Model = Models.brentLinhardt;
                // CompileViews.index = jade.compileFile("./Views/index.jade", {
                //  pretty: true,
                // }); 
                // let indexView = CompileViews.index(indexView_Model);
                // res.send(indexView);  
                res.render('resume', models_brent);
                
            }catch(exception){
                console.log("Wait...");
            }
        });
        app.get('/everything', function(req, res) {
            console.log("##  Fetchin MODEL DATA");
            try{
                let models_brent = require("./Models/All_Model_Data.js").brentLinhardt();
                // let indexView_Model = Models.brentLinhardt;
                // CompileViews.index = jade.compileFile("./Views/index.jade", {
                //  pretty: true,
                // }); 
                // let indexView = CompileViews.index(indexView_Model);
                // res.send(indexView);  
                res.render('resume', models_brent);
                
            }catch(exception){
                console.log("Wait...");
            }
        });

    ////////=============================
        //### GET Request for not ajax mode... 
            /// TechSkills
                app.get('/techSkills', function(req, res) {
                    console.log("##  GET REQUEST: TECH SKILLS MODEL DATA");
                    try{
                        let models_brent = require("./Models/All_Model_Data.js").brentLinhardt();
                        let models_techSkills = require("./Models/techSkills.js");
                        res.render('TechSkills', models_brent);
                    }catch(exception){
                        console.log("Wait...");
                    }
                });

            /// WORK EXP Page
                 app.get('/workExp', function(req, res) {
                    let models_brent = require("./Models/All_Model_Data.js").brentLinhardt();
                    console.log("##  GET REQUEST: Work Experiance MODEL DATA");
                    try{
                        let models_brent = require("./Models/All_Model_Data.js").brentLinhardt();
                        res.render('WorkExp', models_brent);
                    }catch(exception){
                        console.log("Wait...");
                    }
                 });

            /// Education Route
                app.get('/education', function(req, res) {
                    let models_brent = require("./Models/All_Model_Data.js").brentLinhardt();
                    console.log("##  GET REQUEST: EDUCATION MODEL DATA");
                    try{
                        let models_brent = require("./Models/All_Model_Data.js").brentLinhardt();
                        res.render('Education', models_brent);
                    }catch(exception){
                        console.log("Wait...");
                    }
                });

            /// GitHub Profile Page
                 app.get('/github', function(req, res) {
                    let models_brent = require("./Models/All_Model_Data.js").brentLinhardt();
                    console.log("##  GET REQUEST: GITHUB Profile MODEL DATA");
                    try{
                        let models_brent = require("./Models/All_Model_Data.js").brentLinhardt();
                        res.render('GitHubProfile', models_brent);
                    }catch(exception){
                        console.log("Wait...");
                    }
                  });
           
            /// YOUTUBE Channel Page
                   app.get('/tutorials', function(req, res) {
                        let models_brent = require("./Models/All_Model_Data.js").brentLinhardt();
                        console.log("##  GET REQUEST: YOUTUBE Channel MODEL DATA");
                        try{
                            let models_brent = require("./Models/All_Model_Data.js").brentLinhardt();
                            res.render('YoutubeChannel', models_brent);
                        }catch(exception){
                            console.log("Wait...");
                        }
                    });
                    app.get('/youtubeTuts', function(req, res) {
                        let models_brent = require("./Models/All_Model_Data.js").brentLinhardt();
                        console.log("##  GET REQUEST: YOUTUBE Channel MODEL DATA");
                        try{
                            let models_brent = require("./Models/All_Model_Data.js").brentLinhardt();
                            res.render('YoutubeChannel', models_brent);
                        }catch(exception){
                            console.log("Wait...");
                        }
                    });


    ////////=============================
    // PARTIAL ROUTES..    for Ajax Request from a active client..  
            ///// ### EVERYTHING / ALL PARTIALs
                app.get('/partials/everything', function(req, res) {
                    let models_brent = require("./Models/All_Model_Data.js").brentLinhardt();
                    res.render('partials/Resume/Pages/everything', models_brent);
                });
            
            ///// ### DEV SKILLS  PARTIAL   tech skills
                app.get('/partials/techSkills', function(req, res) {
                    console.log("##  Fetchin PARTIALS : TECH SKILLS");
                    var thisResponse = res;
                    API_Interface.fetchAll_techSkills(function( data ){
                        let respondModel = ({skills : data});
                        thisResponse.render('partials/Resume/Pages/techSkills', respondModel);
                    });
                });

            ///// ### PAST WORK EXP PARTIAL
                app.get('/partials/workExp', function(req, res) {
                    console.log("##  Fetchin PARTIALS : workExp");
                    var thisResponse = res;
                    API_Interface.fetchAll_workExp(function( data ){
                        let respondModel = ({jobExp : data});
                        thisResponse.render('partials/Resume/Pages/workExp', respondModel);
                    });
                });

            ///// ### EDUCATION  PARTIAL
                app.get('/partials/education', function(req, res) {
                    console.log("##  Fetchin PARTIALS : education");
                    var thisResponse = res;
                    API_Interface.fetchAll_education(function( data ){
                        let respondModel = ({education : data});
                        thisResponse.render('partials/Resume/Pages/education', respondModel);
                    });
                });

            ///// ### GITHUB  PARTIAL
                app.get('/partials/github', function(req, res) {
                        res.render('partials/Resume/Pages/githubProjects');
                });

            ///// ### YOUTUBE PLAYLIST PARTIAL
                app.get('/partials/youtubeTuts', function(req, res) {
                    console.log("##  Fetchin PARTIALS : youtubeTuts");
                        res.render('partials/Resume/Pages/youtubeTuts');
                });

//////////////////////===============
////////=============================
////  Init App
io.on('connection', function(socket) {
    // console.log("Client Connected.. to SOCKET.IO");
    socket.on('wtf', function(msg) {
        console.log("Incoming Client Event");
    });
});

SERVER.listen(PORT, function() {
    console.log("Started App  -  " + HOST + ":" + PORT);
    // console.log(Object.keys(app.locals.settings));
});

//// export module for  Mocha Testing Suite..  
module.exports = app;