'use strict';
let  API = require("../server/API_Post");

	/// Build the User Model Data	 
 		let userModel = {};



 	 ////###==================------
	 //// Get Education Items
		API.fetchAll_education(function( edu_items ){
			 userModel.edu_items = edu_items;
			 console.log("\nHas Education    Items  :  "+userModel.edu_items.length);
		});
		
	 ////###==================------
	//// Get Tech Skills 
		API.fetchAll_techSkills(function( skill_items ){
			 userModel.skill_items = skill_items;
			 console.log("Has Tech SKills  Items  :  "+userModel.skill_items.length);
		});
		
	 ////###==================------
	//// Get Work Exp 
		API.fetchAll_workExp(function( workExp_items ){
			 userModel.workExp_items = workExp_items;
			 console.log("Has Work Exp     Items  :  "+userModel.workExp_items.length);
		});
		
	 ////###==================------
	//// Get Social Links 
		API.fetchAll_socialLinks(function( social_Items ){
			 userModel.social_Items = social_Items;
			 console.log("Has Social Links Items  :  "+userModel.social_Items.length);
		});
		
	 ////###==================------
	//// Get Contact Information 
		API.fetch_brentContactInfo(function( brent ){
			 userModel.brent = brent;
			 console.log("Has Brent's contact Info:  "+userModel.brent.jobTitle);
		});



exports.brentLinhardt = function(){
	if(userModel.edu_items){
		return {
			
						/////  USER INFO  
							AppTitle: userModel.brent.description,
							avatarSRC : userModel.brent.avatarSRC,
							email    : userModel.brent.email,
							fname    :  userModel.brent.fname,
							lname    :  userModel.brent.lname,
							generalLocation  :  userModel.brent.generalLocation,
							userJobTitle     :  userModel.brent.jobTitle,
					

						/////////////////////////	
						//// External Links
							externalLinks : userModel.social_Items,

						/////   PAST   Experiance Area
							jobExp : userModel.workExp_items,
						//// EDUCATION
							education : userModel.edu_items,
						//// Array of Technical Skill Set..
							skills  : userModel.skill_items,

				/////   Footer
					footerText : "Hire Brent Linhardt",
				
		};
	}else{
		console.log("API Fetch has not yet COMPLETED !@@");
	}
};