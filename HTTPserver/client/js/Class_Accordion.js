function Accordion(accordionName, headerPos){
	Widget.call(this, accordionName, headerPos);

	this.items = [{}];   // Array of JSON objects

	this.accordionID = "accordion_"+this.name;

	this.content = [
		// "<div class='accordion_container' style='width:100%;height:100%;'>",
			"<div class='accordionContainer' id='accordion_"+this.name+"'>",
					/// Section
						//// Title
						"<div class='accordion_itemTitle'>", 
							"Tools for API",
						"</div>",
						"<div class='accordion_itemContent'>",
							/// Content
									// "<img src='https://s3-us-west-1.amazonaws.com/adeptpro/Resume/img/brentL.jpg'>",
										"<p>Tools Utilized for ",
										"The API Server Micro Service, written for this application, Utilized nodeJS, mongoDB, & gruntJS, as the primary tools.</p>",
									"<p>",
										"mongoDB, nodeJS, gruntJS",
									"</p>",
						"</div>",
					/*
						/// Section
							//// Title
							"<h3 class='accordion_itemTitle'> Brent </h3>",
							"<div class='accordion_itemContent'>",
								/// Content
										"<img src='img/avatar.jpg'>",
										"<p>",
											"Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam. Integer",
										"</p>",
							"</div>",
						/// Section
							//// Title
							"<h3 class='accordion_itemTitle'> Brent </h3>",
							"<div class='accordion_itemContent'>",
								/// Content
										"<img src='img/avatar.jpg'>",
										"<p>",
											"Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam. Integer",
										"</p>",
							"</div>",
					*/
	  		"</div>",
	].join(" ");



	////  Run After Constructor   -->  this.build();
	this.postBuild = function(){
		// Add Icon And Update Title
			this.updateTitle("Accordion", "list");
		
		//// Turn off  Overflow Hidden mode
			this.overFlow_show();

		///  Init Accordion from jQuery UI
			this.init_jqueryUIAccordion();
	};

};
	Accordion.prototype = new Widget();   

	//// Create HTML from array of this.items..   -->  called before this.build()  
	/// fills this.content  so when this.build is called .. .  appropriate items get filled..  
	Accordion.prototype.build_thisAccordion = function(){ 

	};

	/// Returns HTML for all accordion items in this.litems
	Accordion.prototype.buildHTML_forItems = function(){
		var newHTML = '';
		for(var i=0; i<= this.items.length-1; i++){
			newHTML += [
				/// Section
				//// Title
				"<h3 class='accordion_itemTitle'> 1 </h3>",
				"<div class='accordion_itemContent'>",
					/// Content
							"<img src='img/avatar.jpg'>",
							"<p>",
								"Item Content",
							"</p>",
				"</div>",
			].join(" ");
		}

		return newHTML;
	};

	Accordion.prototype.updateAccordionItems = function(){
		var itemsInAccordion = this.items;
		/// Try and Destroy if has Already been Init
			try{
				$("#"+this.accordionID ).accordion( "destroy" );
			}catch(err){
				////  not needed to destroy..  
			}
		///  reinit  accordion
			$("#"+this.accordionID ).accordion({
				animate: 99,
				active : -1,
				heightStyle : "content", //"fill",
				collapsible: true, // Able to Collapse All Options..
			});
	};
	
	Accordion.prototype.addItem = function(JSON_item) {
		var itemHTML = [
			"<h3 class='accordion_itemTitle'> New Item Title </h3>",
			/// Content
			"<div class='accordion_itemContent'>",
						"<p>",
							"Item Content",
						"</p>",
			"</div>",
		].join(" ");
		$("#"+this.accordionID).append( itemHTML );

		this.init_jqueryUIAccordion();
	};

	Accordion.prototype.init_jqueryUIAccordion = function() {
			/// Try and Destroy if has Already been Init
				try{
					$( "#"+this.accordionID ).accordion( "destroy" );
				}catch(err){
					////  not needed to destroy..  
				}
			///  re-run jquery ui  accordion component..  over container
				$("#"+this.accordionID ).accordion({
					animate: 99,
					active : -1,
					heightStyle : "content", //"fill",
					collapsible: true, // Able to Collapse All Options..
				});
	};	


