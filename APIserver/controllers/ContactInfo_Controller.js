/// Education Controller..
var restful = require("node-restful");


module.exports = function(app, route){

	// Setup the controller for REST
		var crudMethods = ['get','post'];
		var rest = restful.model(
					      "contactInfo",  /// Path
			    app.models.contactInfo    /// Controller
		).methods( crudMethods );

	// Register this endpoint with the application
		rest.register(app, route);

	/// return middle ware
		return function(req, res, next){
			next();
		};
};
