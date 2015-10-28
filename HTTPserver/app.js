#!/usr/local/bin/node

'use strict';

/////////////////
////  Dependancies  For HTTP Server..
let consolidate = require('consolidate');
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
let compileSass = require(__dirname+"/server/_SASS_Compile.js");
// compileSass.compile();
/**
 * API keys and Passport configuration.
 */
// let secrets = require('./config/secrets');
// let passportConf = require('./config/passport');

///////////////
//// Compile Views... 
let CompileViews = {};
//// Build a View   by running function and passing Object of Model Data..
// CompileViews.index({AppTitle: "Sweet App Title"});


/////////////////////////////////
//////// Set up  app.local    Object	 
    app.locals.title = "That Food Truck App..";
    // app.locals.email = "someDebuggerEmail";

//// HOSTING CONFIG 
    let HOST = "localhost";


let PORT = app.locals.serverPort = ( 1337 );


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
            console.log("##  Incoming Client --> HTTP Server..");
            try{
                res.send("Welcome to the HTTP server  -- WTF.. WhereTheFood@  ");
                 
            }catch(exception){
                console.log("Wait...");
            }
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