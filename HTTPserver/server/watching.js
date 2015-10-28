var watch = require('watch');


console.log("watching app.js path");
watch.watchTree('./', function (f, curr, prev) {


    if (typeof f == "object" && prev === null && curr === null) {
      // Finished walking the tree
    } else if (prev === null) {
      // f is a new file
      console.log("newFile   "+f);

    } else if (curr.nlink === 0) {

      // f was removed
      console.log("deletedFile  "+f);


    } else {

      if( f !== "log.txt"){
        // f was changed
        console.log("\n-----------------\n---- changedFile   "+f);
          
            var filePath = f.split("/");
            if(filePath.length === 1){
                 // changed file at root of program   in folder with app.js
            }else if(filePath.length === 2){
                 ///  changed file one level down
                  var folder = filePath[0];
                  var file   = filePath[1];
                      if( folder === "server" ){
                            console.log("\n-----------------\n---- A Server File Has Been Updated..");
                      }
            } 
      }



    }
  
  });