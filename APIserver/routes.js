////  Routes  to API Content Controllers..
	module.exports = {
		//// 
			'/education' : require("./controllers/Education_Controller"),
			'/techSkills' : require("./controllers/TechSkills_Controller"),
			'/workExp' : require("./controllers/WorkExp_Controller"),
			'/socialLinks' : require("./controllers/SocialLinks_Controller"),
			'/contactInfo' : require("./controllers/ContactInfo_Controller"),
	};
