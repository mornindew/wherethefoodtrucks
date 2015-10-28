//// Graph Class

///// Stamp out different types of Canvas Animated Graphs..
function Graph(graphName, headerPOS, graphType){
	//// Make Sure Constructor Params are Passed to the Class 
	/////    Inherits From Widget Class  
		if(graphName !== undefined){
			if(graphType !== undefined){
				/// This Builds from the Basic Widget Class..
				Widget.call(this, graphName, headerPOS);
			}else{
				alert("No Graph NAME was Passed to Graph() constructor");
			}
		}else{
			alert("No Graph NAME was Passed to Graph() constructor as the first Param");
		}
	
	///// Set Height of Canvas Depending on if Header is Showing..
	//// Check if this Widget has a header bar
	////   Assign canvas height appropriately
		if( this.headerPOS === "off"){
			this.cHeight = this.height;
		}else{
			/// Has a Header on top or bottom I dont care.. i just want the height..
			this.cHeight = this.height-this.header_height;
		}

	/// Set Default Description
		this.description = "a new Instance of the Graph Class";

	//// Charts are Displayed on this Canvas DOM element
		this.basicCanvas = [  
				"<canvas class='GraphClass_Canvas' ",
				  "id='canvas_"+this.name+"' ", 
				  // "height='"+this.cHeight+"px' width='"+this.width+"px' ",
			   ">",
					"Canvas not Supported.",
				"</canvas>",	  
		].join(" ");


	/// Post building
		this.postBuild = function(){
			/// set content bg to color
				$(this.id_content).css({"background":"#FFF"});
		};
};

///  Inherit from Widget Class..  
	Graph.prototype = new Widget();   /// Params are for Widget() passed from inside Graph constructor  using Widget.call(this, param1, param2); 



//// Extra Styling ontop of Widget.prototype.styleIt()   called at end of this method.
	Graph.prototype.extraStyleIt = function(){
	   // console.log("Extra Styling.. .for Graph. "+this.name);	
	};

	Graph.prototype.addCanvas2Content = function(){
		this.updateContent(this.basicCanvas);
	};

/// Destroy  nested Chart..
Graph.prototype.removeInstance = function(){
	if(this.thisChart !== undefined){
		this.thisChart.destroy();
	}
};

/// Returns ctx object for this Widgets Canvas..
	Graph.prototype.get_ctx = function(){
		return document.getElementById("canvas_"+this.name).getContext("2d");
	};


//// build graph
Graph.prototype.buildRadarGraph = function(){
	this.removeInstance();
	this.addCanvas2Content();
	/// Get Canvas Element
	var ctx = this.get_ctx();
	
	var data = {
	    labels: [
	     "Javacript",
	     "Databases",
	     "Networking",
	     "Security",
	     "Speed",
	     ],
	    
	    datasets: [
	        {
		        label: "My Warrior",
	            data: [100, 59, 52, 81, 86],
	            
	            fillColor:  "rgba(20,20,20,0.42)",
	            strokeColor: "red", //"rgba(220,220,220,1)",
	            /// Points
		            pointColor: "rgba(220,220,220,1)",
		            pointStrokeColor: "#810D0D",
		            pointHighlightFill: "#red",
		            pointHighlightStroke: "rgba(220,220,220,1)",
	        },
	    ]
	};
	var options = {
		animation: false,
		// animationSteps : 42,
		// showScale: false,
	};
	// myChart.thisChart = new Chart(ctx).Bar(data, options);
	this.thisChart = new Chart(ctx).Radar(data);
	
};



Graph.prototype.buildBarGraph = function(){
	this.removeInstance();    /// Deletes this Widgets Chart Instance..
	this.addCanvas2Content(); /// Add Canvas to the Container of this Widget..
	var ctx = this.get_ctx();

	var data = {
	    labels: [
	     "Jan",
	     "Feb",
	     "March",
	     "Apr",
	     "May",
	     "June",
	     "July",
	     // "Aug",
	     // "Sept",
	     // "Oct",
	     // "Nov",
	     // "Dec"
	     ],
	    
	    datasets: [
	        {
	            label: "My First dataset",
	            fillColor: "rgba(220,220,220,0.5)",
	            strokeColor: "rgba(220,220,220,0.8)",
	            highlightFill: "rgba(220,220,220,0.75)",
	            highlightStroke: "rgba(0,0,0,1)",
	            data: [65, 59, 80, 81, 56, 55, 40]
	        },
	        {
	            label: "My Second dataset",
	            fillColor: "rgba(151,187,205,0.5)",
	            strokeColor: "rgba(151,187,205,0.8)",
	            highlightFill: "rgba(151,187,205,0.75)",
	            highlightStroke: "rgba(0,0,0,1)",
	            data: [28, 48, 40, 19, 86, 27, 90]
	        },
	        {
	            label: "My Third dataset",
	            fillColor: "rgba(0,0,0,0.7)",
	            strokeColor: "rgba(22,187,205,0.8)",
	            highlightFill: "rgba(0,0,0,0.75)",
	            highlightStroke: "rgba(0,0,0,1)",
	            data: [32, 11, 77, 42, 56, 27, 10]
	        }
	    ]
	};

	var options = {
		barShowStroke : true,
		barDatasetSpacing : 0, //Number - Spacing between data sets within X values
		barValueSpacing : 11,  //Number - Spacing between each of the X value sets
	};

	this.thisChart = new Chart(ctx).Bar(data, options);
};

