
var movingWidgetTimer = null;   //// Debuggs when they move a widget off the screen and it never gets it's mouseup registered fix this..
                                //// this setTimeout is started at widget moving initial mousedown...  after timer if nowMovingWidget is not null..  means they dragged widget off the screen..
var WidgetHeaderHeight = 18;
////  Hold name of widget that is currently being moved on screen
	var nowMovingWidget = null;    //// Stores name of currently moving widget..
	var defaultContent = "   loading.."

///  define   widgetInstance.element2_append2    for putting widget into  that widget when build gets run..

//// Widget Constructor...   --> Pass Widget Name & headerLocation("top","bottom", "off")
////  If no headerLocation is passed it will be in No Header or OFF mode..
function Widget(widgetName, headerLocation){
	//////  Where or if to have a Header on this Widget..
			/////  Nothing Passed as Header location =--> set to Off  --> no Header on widget then..
			//// Position of Widget Header  		-->  off bottom top  can be passed optional..
				if(headerLocation !== undefined || headerLocation !== ""){
					this.headerPOS = headerLocation;  ///  --> Default is "off" can be set to "top" or "bottom"  
				}else{
					this.headerPOS = "off";
				}    
	var that = this;   ////  makes working with jQuery easier...   just the instance use the word that here when defining class..    so from inside jquery this word won't conflict..
	///////////////////////////////////////////////////////////////////////
	//////// ++++=====    Unique Instance-ness  =======+++++ /////////
			////  widgetName Passed is used to generate unique IDs
				this.name = widgetName;		//// Name that is Passed to Constructor..  stored and used throughout to generate ids and classname..
			/// Description for Developer Reference..  can be set..
				this.description = "Default Description.. for new Widget..";

			//////  ID  with # for being $(this.id).someJquery();
			//// Story jquery Selectors for different components..
				this.id = '#w_'+this.name;  /// Pass to jQuery when needed... :)
				this.id_content = "#w_"+this.name+"_content";

				this.id_HeaderTitle = "#w_"+this.name+"_header_title";
			
			//////////////////////////////////////////
			////   OPTIONS... 
					////  Set to true for turning of drag move on widget header..
						this.neverMovable = false;
					////  set this to true for transparent Background mode,,   NEEDS to Be Updated..
						this.isTransparent = false;
					// can be set to someOther Element with #selector  # symbol is needed..
						this.element2_append2 = null;  

					//// Positioning
						this.zIndex = 200;  ////  css z-index level for that widget..
						this.left = ( (window.innerWidth/2) - (this.width /2) );		// Default Center of Screen..
						this.top  = ( (window.innerHeight/2) - (this.height /2) );		// Default Center of Screen..

					/// Size -->  width Height of Instance..
						this.width = 333;    //// Showing Width of that Widget..
						this.height = 333;   //// Showing Height of that Widget..
			
					/// Turn Off / On icons on the Header.. for Widget instance..
						this.has_header_moveIcon = true;
						this.has_header_maximizeIcon = true;
						this.has_header_minimizeIcon = true;
						this.has_header_closeIcon = true;
				

	///////////////////////////////////////////////////////////////////////
	//////// ++++=====    STATE AND RIGHT NOW!!!  =======+++++ ////////////	
		////  STATE of the Widget 
		//// Booleans  for state or option..
			this.nowShowing = 0; /// Boolean for if that Widget is Currently Visible  on the Clients Screen..
			this.isMinimized = 0;
			this.isMaximized = 0;
			this.isResizable = 0;
			this.isDraggable = 0;  // if Widget is Draggable -->  jQueryUI  Click and Drag -- Drop..
			this.isHidden = 1;		/// 1 when Widget is closed.. / --> conceiled..

			this.isAnimating = 0;   /// 1 --> when in middle of an animation..  hide/show/effect  
			this.isEffectRunning = 0;   /// So only one Effect runs on that Widget at a time..
			this.height_down = 0;   /// height for Widget in Conceiled mode /  Off Hidden Mode....
		
		//// Booleans for knowing Hover State of Widget Header Buttons..
		///// State of this Widget Header Hoveringss..
			this.hoveringClose = 0;      //  --> set to 1 when hovering this widgets close button.
			this.hoveringMinimize = 0;   //   
			this.hoveringMaximize = 0;   //    



	///////////////////////////////////////////////////////
	//////// ++++=====    HEADER  =======+++++ ////////////
	///// Header Vars
		//// Header Size --> include Border if Hazzz..
			this.header_height = 18;
			this.header_border = "1px solid #FFF";
		
			///// Image Paths  for Close/Max/Minimize
			/// HEADER ICON IMAGES..  -->  path to Images used for header icons..  ..
				this.closeButtonPath = "img/Button-Close-icon.png";
				this.minimizeButtonPath = "img/icon_minimize.png";
				this.maximizeButtonPath = "img/icon_maximize.png";
				this.moveButtonPath = "img/icon_move.png";


	/////////////////////////////////////////////////////////
	//////// ++++=====    CONTENT  =======+++++ ////////////
	/////  CONTENT Container Vars  --  Container of 
		// this.content_bgColor = "rgba(0,0,0,   0.0)";  //"#aeaeae";
		this.content_fontColor = "#000";
		this.content_height = (this.height-this.header_height-2);

	//// Animation Durations  -- Transition for showing or hiding of this widget.. 
		this.transtionTime_show = 123;   /// showing Animation Time
		this.transtionTime_hide = 183;	 /// hiding  Animation Time

	//// Conent For the Widget..  --> Loading in $("#w_"+this.name+"_content")
		this.content = defaultContent; 
};

///////////////////////////////////////////////////////////////////////////
//////  Hook into this Class Default Methods by Defining functions.
	//// pre build
		Widget.prototype.preBuild = null;
	///// post Builds..
		Widget.prototype.postBuild = null; 
	/// Hide / Show hooks 
		Widget.prototype.show_callback = null;
		Widget.prototype.show_preProcess = null;
		Widget.prototype.hide_callback = null;
		Widget.prototype.hide_preProcess = null;
		Widget.prototype.extraStyleIt = null;

//////   End of hooking into default methods.. 
///////////////////////////////////////////////////////////////////////
/// 

///// Jump to scrolll Position..
///// Scroll to bottom or top of widgets Content
	    // Widget.prototype.scrollToTop = function(callback){
	    // 		var thisID = tools.remove_jqueryIDprefix(  this.id_content  );
	    // 		tools.scrollTo_TopOfDiv(thisID);
	    // 		if(callback){ 
	    // 				callback();
	    // 		}
	    // };		
	/// 
	    // Widget.prototype.scrollToBottom = function(callback){
	    // 		var thisID = tools.remove_jqueryIDprefix(  this.id_content  );
	    // 		tools.scrollToBottomOfDiv(thisID);
	    // 		if(callback){ callback(); }
	    // };	


//// stores how far right of leftside of header was clicked..
	Widget.prototype.headerClick_leftOffset = 0;
	Widget.prototype.getClickPos_withinHeader = function(mousePosX){   //// called when a header that is draggable is clicked mousedown
			this.headerClick_leftOffset = 0;
			var thisMouseClickPositionInDOM = (mousePosX);
			var widgetLeftOffset = this.left;
			var amountIntoWidget = ( thisMouseClickPositionInDOM - widgetLeftOffset );
			this.headerClick_leftOffset = amountIntoWidget;    //// stored left offset to include in where current Pos is.. 
	};

///  Some Widgets have an Extra Styling that is needed,  if it is not null,  this runs at end of the StyleIt()



//// Replace HTML in this Widget Content Container..\
	Widget.prototype.updateContent = function(newContentHTML){
		///  Replace Content for this widget
			$(this.id_content).html(newContentHTML);
	};	




//// Resize Widget
	Widget.prototype.resizeExtra = null;
	//// set new Size for widget..
	Widget.prototype.resize = function(newWidth, newHeight){
		var that = this;
		this.width = newWidth; 
		this.height = newHeight;
		$(this.id).css({
			width: that.width,
			height: that.height,
		});
		that.updateContentHeight();   // contains styleIt func too..

		// check for extra resize method..
			if(that.resizeExtra !== null){
				that.resizeExtra();
			}
	};

////// Remove / Show Header Icon
	Widget.prototype.showMoveIcon = function(){
		$("#w_"+this.name+"_moveBTN").show();
	};
	Widget.prototype.hideMoveIcon = function(){
		// console.log();
		$("#w_"+this.name+"_moveBTN").hide();
	};

//// Sets Resizeable Mode for this Widget,  
////   Edges and Bottom Corners can start a resize
	Widget.prototype.setResizable = function(){
		var that = this;

		this.showMoveIcon();
		// if headerBar is at bottom, top, or not displayed..
		///    assign appropriate resize handles..
			if(this.headerPOS === "top"){
				var resizeHandles = "e, s, w, sw, se";
			}else if(this.headerPOS === "bottom"){
				var resizeHandles = "n, e, w, nw, ne";
			}else{  //// when not showing header for widget allow resizing from any side or corner..
				var resizeHandles = "n, e, s, w, sw, se, nw, ne";
			}
			
		var options = {
			//// User Has Stopped Resizing the Widget..
			stop: function(event, ui){   /// Done Resizing..
				console.log("Done Resizing Widget: "+that.name);
				//// Run extra style post resize if it is not null;

				try{
					that.resizeExtra();
				}catch(err){}
				
				// update stored width & height
					//// Height / Width post Resize
						that.width  = ui.size.width;
						that.height = ui.size.height;
					////  POS that.left
						that.left = ui.position.left;
						that.top = ui.position.top;
					/// Content height var
						that.updateContentHeight();

			},
			handles  : resizeHandles,
			autoHide : true,  /// hide handles when not focused on widget..
			disabled : false,  ///  for disabling / re-enabling
			/// Animate Resizing.. of Widget..
				// animate: true,
				// animateDuration : "fast",
			// position: {top: 0}
		};
		$(this.id).resizable(options);
	};

//// Make Widget Background Transparent...
	Widget.prototype.makeBG_transparent= function(){
		$(this.id).css("background","");
		$(this.id).css("background","rgba(0,0,0, 0.88)");


		$(this.id_content).css("background","");
		$(this.id_content).css("background","rgba(0,0,0, 0)");
	};

	Widget.prototype.updateContentHeight = function(){
		this.content_height = (this.height-this.header_height-2); 
		this.styleIt();
	};
/// Removes Resizable Functionality  from widget..
	Widget.prototype.removeResizable = function(){
		var options = {
			disabled : true,
			// position: {top: 0}
		};

		$(this.id).resizable(options);
	};


/// Update Title sitting in the Header Container..
	Widget.prototype.updateTitle = function(newTitle, headerIconName){   // options --> {imgPath: pathString, imgCaption}
		if(!headerIconName){
				var htmlString =[
					"<div class='widget_header_IconImg_container'>",
						"<img title='       "+newTitle+"'",
						  "class='widget_header_IconImg' ",
						   "src='img/headerIcons/headerTop/"+"_blank_"+".png'>",
					"</div>",

					// "<span class='widgetUpdatedTitleText'>",
						newTitle,
					// "</span>",
				].join(" ");
		}else{
				var htmlString =[
						"<div class='widget_header_IconImg_container'>",
						  "<img title='       "+newTitle+"'",
							  "class='widget_header_IconImg' ",
							   "src='img/headerIcons/headerTop/"+headerIconName+".png'>",
						"</div>",
					// "<span class='widgetUpdatedTitleText'>",
						newTitle,
					// "</span>",
				].join(" ");
		}
		$(this.id_HeaderTitle).html( htmlString );
	};

//////////////////////////////
////// ANIMATION EFFECT
		/// Shake Widget Using jqueryUI
		Widget.prototype.effect = function(effect, time, callback){
			var that = this;

			/// make sure some effect was passed to method
				if(effect !== undefined){	
					//// Effect Options
						var options = {
							duration: time,
							easing : "easeInCubic",
							// queue: false,
						}

					/// Run Effect if one is not running on this widget container..
						if(this.isEffectRunning === 0){
							this.isEffectRunning = 1;
							$(this.id).effect(effect, options, function(){
								  console.log("Done Running Effect "+effect+" on widget %s", that.name);
								  that.isEffectRunning = 0;  // Done Animation Effect Reset isEffectRunning Boolean..
								//// HAS CALLBACK???   // --> now done from normal callback
									if(callback){   /// add complete key to object if callback exists
										callback();
									}
							});
						}else{
							console.log("Failed to Run Animation - Animation Already Running on Widget..");
						}
				}else{
					/// Effect Choice was not passed to the Method
					alert("No Effect Passed to :"+this.name);
				}
		};

		Widget.prototype.shake = function(callback){
			if(callback){
				this.effect("shake", 472, callback);
			}else{
				this.effect("shake");
			}
		};


Widget.prototype.startedMove = 0;
Widget.prototype.returnFromMovePos = {};

///// Maximize State  for returning  after Maximize
	Widget.prototype.returnFromMaximizePos = {};
	Widget.prototype.returnFromMaximizeSize = {};
	Widget.prototype.returnFromMaximize = function(){
		this.isMaximized = 0;
		this.move(this.returnFromMaximizePos.left, this.returnFromMaximizePos.top);	
		this.resize(this.returnFromMaximizeSize.width, this.returnFromMaximizeSize.height);	
		this.returnFromMaximizePos = {};
		this.returnFromMaximizeSize = {};
	};

	Widget.prototype.maximizeWidget = function(){
		if(this.neverMovable === false){
			if(this.isMaximized === 1){  
				//// Already in Maximized Mode   so Minimize when called rather..
				console.log(" Already Maximized : widget: "+this.name);
				this.returnFromMaximize();
				// console.log("Return Pos : "+JSON.stringify(this.returnFromMaximizePos) );
				// console.log("Return Size: "+JSON.stringify(this.returnFromMaximizeSize) );
			}else {
				///// Run Maximizer func here
				this.returnFromMaximizePos  = {left: this.left, top: this.top};
				this.returnFromMaximizeSize = {width : this.width, height: this.height}
				this.isMaximized = 1;  // set mode for this widget..
					console.log("Maximizing :"+this.name);
					//// Move to top Left Corner
						var thisTopPos = (32);
						this.move(3, thisTopPos);
						this.resize(window.innerWidth-7, (window.innerHeight - thisTopPos ) );
			}
		}
	};

	//// Minimize/Maximize Widget -- Requires a Header to be Showing.. minimizes content keeps header visible for moving or reshowing..
	////  If State is not correct when called it called opposite ..  --> depends on that.isMinimized
	Widget.prototype.minimizeWidget = function(){    
		if(this.isMinimized === 1){
			/// Already Minimized --  
			console.log(" Already Minimized: widget: "+this.name);
		}else if(this.isMinimized === 0){
			//// Not Minimized so Minimize
				console.log("Minimize : "+ this.name);
				/// Hide Content 
				/// Resize Container to only be height of header

				// $(that.id_content);
				// $(that.id_content).hide();
				this.isMinimized = 1;  // set boolean as Minimized Mode for Widget..
		}
	};

//////////////////////////////////////////////////////////////////////////////
////  Content HTML -->  Returns String of HTML  <div> tags filled  :)  
	Widget.prototype.getHTML = function(){
		/// Build HTML for this Widget.. 
			/// Open Widget  
				var html = [
					"<div id='w_"+this.name+"' class='widgetContainer'>",  /// OPENING DIV TAG FOR NEW WIDGEt..
				].join(" ");

			//// Header   -->  Branch for showing at top / bottom / not showing in the style it function.. 
					html += [
						"<div class='Widget_Header_container' id='w_"+this.name+"_header'>",
							"<span id='w_"+this.name+"_header_title' class='headerTitleContainer'>"+this.name+"</span>",  /// Widget Title  
							"<img class='headerIcon_closeBTN' id='w_"+this.name+"_closeBTN' src='"+this.closeButtonPath+"' title='     Close'>",
							"<img class='headerIcon_minBTN' id='w_"+this.name+"_minimizeBTN' src='"+this.minimizeButtonPath+"' title='     Minimize'>",
							"<img class='headerIcon_maxBTN' id='w_"+this.name+"_maximizeBTN' src='"+this.maximizeButtonPath+"' title='     Maximize'>",
							
							// "<img class='headerIcon_moveBTN' src='"+this.moveButtonPath+"' title='Move'>",
						"</div>", // end of widget title
					].join(" ");


			//// Content
				//// Widget Content..
					html +=[
						"<div  id='w_"+this.name+"_content' ",
						   "class='WidgetContent'>",
							this.content,
						"</div>",  /// end of widget content
					].join(" ");

			//// Closing.  the Widget DIV
				html += [
					"</div>",  //// Closing widget DIV tag..
				].join(" ");

		return html;   /// Return Generated HTML  for this Widget to be Appended to some DOM element..
	};

//// Figure out my zIndex
	Widget.prototype.getMyZindex = function(){
		//// whats my z index relative to other visible Widgets.. 
			var zIndex = this.zIndex;
			return zIndex;
	};

//// Update z-index 
	Widget.prototype.updateZindex = function(new_zIndex){
			this.zIndex = new_zIndex;
			$(this.id).css("z-index",new_zIndex);
	};

//// Make sure Widget is smaller than window --> make Sure Widget is not Hanging Off Window..
Widget.prototype.handleWidgetResizing = function(){   // runs through to make widget can stil be viewed proper..
	var that=this;
	that.checkIfLargerThanWindow(function(){
		that.checkIfOffScreen_Width(function(){
			that.checkIfOffScreen_Height(function(){
				// console.log("allDone");
			});
		});
	});
};

//// Shrinks Widget Width if larger than window
	Widget.prototype.checkIfLargerThanWindow = function(callback){
		var windowWidth = window.innerWidth;
		var thisWidgetWidth = this.width+18;
		if(windowWidth <= (thisWidgetWidth) ){
			//// Widget is Wider than the Window..
				var difference = (thisWidgetWidth - windowWidth);
				var newWidth = ((thisWidgetWidth - difference)-6);
					/// resize to be smaller than window..
						this.resize(newWidth, this.height);
		}else{
			//// Widget is smaller than the Window Width
		}
		// console.log("Checking %s's Width", this.name);
		if(callback){ 
			setTimeout(function(){
				callback();
			},100)}
	};


//// Checks if Widget is Off Screen _aniMoves back if so..
	Widget.prototype.fixOffScreenPos = {};  /// When Widget Goes Off Screen this obj hold the best visible pos,  gets build 1 func at a time checkIfOffScreen_Width then checkIfOffScreen_Height
	Widget.prototype.checkIfOffScreen_Height = function(callback){
		var that = this;
		var windowHeight = window.innerHeight;
		var thisWidgetHeight = this.height;
		var thisWidgetTop = this.top;
		if(this.isMaximized === 1){
			//// Except in Maximized mode..
		}else{
					var thisWidgetHeightTotal = (thisWidgetTop+thisWidgetHeight);

					/// check and make sure window is large enough for widget width and left offset..
					if(windowHeight >= (thisWidgetTop+thisWidgetHeight) ){
						that.ani_move(that.fixOffScreenPos.left, that.top);
					}else{
						//// Window was to small..
					    var difference = ( (thisWidgetTop+thisWidgetHeight) - windowHeight  );
					    // console.log("Difference: "+(difference) );
					    /// Move this Widget Left  the difference amount so the entire widget is still on screen.. 
					    	var newTopPos = (thisWidgetTop - difference)-4;
					    	that.ani_move(that.fixOffScreenPos.left, newTopPos);
					}
					// console.log("Checking %s's Left", this.name);
					if(callback){ callback(); }	
		}
	};

	///// Moves Left if widget is Floating off Screen to the Right..
		Widget.prototype.checkIfOffScreen_Width = function(callback){
			var that = this;
			var windowWidth = window.innerWidth;
			var thisWidgetWidth = this.width;
			var thisWidgetLeft = this.left;
			if(this.isMaximized === 1){

			}else{
				//// Check First if Widget is Hovering off the left side of the window
					if(this.left <= 10){
						//// make sure not in maximized mode
							that.fixOffScreenPos = {left:3}
							// this.ani_move(3, this.top);
					}else{
						var thisWidgetWidthTotal = (thisWidgetLeft+thisWidgetWidth);

						/// check and make sure window is large enough for widget width and left offset..
						if(windowWidth >= (thisWidgetLeft+thisWidgetWidth) ){
							that.fixOffScreenPos = {left:that.left}
						}else{
							//// Window was to small..
						    var difference = ( (thisWidgetLeft+thisWidgetWidth) - windowWidth  );
						    // console.log("Difference: "+(difference) );
						    /// Move this Widget Left  the difference amount so the entire widget is still on screen.. 
						    	var newLeftPos = (thisWidgetLeft - difference)-2;
						    	that.fixOffScreenPos = {left:newLeftPos}
						    	// this.ani_move(newLeftPos, this.top );
						    // return true; 
						}
						// console.log("Checking %s's Left", this.name);
					}
					if(callback){ callback(); }	
			}
		};



////  Style that Widget..  -->  put as much of this in Css as possiblt..
Widget.prototype.styleIt = function(){
	//// Widget Container styling
		var that = this;
		//// Position and Resize Main Widget Container if Needed??
			$(this.id).css({    
				////  POSITIONING
					left: that.left,
					top: that.top,
					"z-index":that.zIndex,  ///  -->  z-index zIndex

				//// WIDTH / HEIGHT
					"width": that.width,
					"height": that.height,
			});

		//// if there is a header .. Position it in Right Spot top/bottom.. 
		////  Else no header Required ..  just opacity 0 & hide for now..
				if(this.headerPOS === "top"){
				/// Show Header at Top
					// >> TOP MODE");
					$(this.id+"_header").css({    //// HEADER for that Widget..  --> holds Close button..				
							top: "0px",  bottom: "auto",   });

				}else if(this.headerPOS === "bottom"){
				/// SHOW HEADER AT BOTTOM OF WIDGET RATHER.
					// > BOTTOM MODE");
					$(this.id+"_header").css({    //// HEADER for that Widget..  --> holds Close button..				
							top: "auto",   bottom: "0px",   });

				}else{

				//// DO NOT SHOW THE HEADER BAR for this Widget... 
					$(this.id+"_header").css({    //// HEADER for that Widget..  --> holds Close button..				
							opacity:0,
					}).hide();
				}
			
	//// CONTENT CONTAINER  -->   height & top Position..
		/// Subtract header Height if it's showing
			///// Set Top Offset  -->  Off and Bottom are same so just check for top
				var headerPOS = this.headerPOS;
				if(headerPOS === "top"){
					var topPOS = (this.header_height+1) + "px";
				}else{
					/// set topPOS for bottom Header mode..
					var topPOS = "0px";   }
			
			//// get Value for Contents  Height for top/bottom/off mode.
				if(this.headerPOS === "bottom" || this.headerPOS === "top"){
					var contentHeight = this.content_height+"px"; 
				}else{
					/// No Header Displayed for this Widget..
					var contentHeight = (this.content_height+this.header_height+3)+"px";
				}
				
			/// set the values
				$(this.id_content).css({
						top : topPOS,
						height: contentHeight,
				});

			//// If extraStyleIt is defined run it.. 
			//// Try and Run the Extra Styling for this Widget,  Some may have some may not..
				if(this.extraStyleIt !== null){
					this.extraStyleIt();
				}
};


//// Allow Content to Be taller than Container
	Widget.prototype.overFlow_show = function(){
			$("#w_"+this.name).css('overflow', "visible");
			$(this.id_content).css('overflow', "visible");
	};

//// Sets Descripion of this Widget.  -- used for Developer Reference..
	Widget.prototype.setDescription = function(newDescrip){
		this.description = newDescrip;
	};

///// Make Widget Expand Height to Always be as tall as its Contents may need..
	Widget.prototype.makeHeightAuto = function() {
		// body...
			$(this.id).css({height: "auto"});
			$(this.id_content).css({height: "auto"});
	};

///// Get Current Position of the Widget
Widget.prototype.getCurrPOS = function(){
	var POS = $(this.id).offset();
	return { top: this.top, left: this.left };
};

Widget.prototype.updateCurrPOS = function(){
	var POS = $(this.id).offset();
	/// Update Position for 
		this.top = POS.top;
		this.left = POS.top;
};



////  handle Closing on Close Button Click.. ////
////    Move WIdget on Header Dragging -- Buggy in Firefox..
	Widget.prototype.setUpHeaderButtons = function(){
		var that = this;    // scope from jQuery...  fix..
		
		////// CLOSE BUTTON
			$(this.id+"_closeBTN").unbind("mouseenter mouseleave mousedown");
			///// Hover ON HOver Off -->  Close Button for That WIDGET..
			$(this.id+"_closeBTN").hover(function(event){
				that.hoveringClose = 1;
				$(this).css({
					cursor: "hand",
					cursor: "pointer",
					cursor: "not-allowed",
				});
			}, function(event){
				$(this).css({
					cursor: "default",
				});
				that.hoveringClose = 0;
			});

			//// Clicking Close Button for that Widget.
			$(this.id+"_closeBTN").mousedown(function(event){
					if( event.preventDefault ){   /// Prevent IMG DRAGGIN in firefox..
	                    event.preventDefault();
	                }
					that.hide();
			});

			//// Clicking Maximize / Resize Button Button for that Widget.
			$(this.id+"_maximizeBTN").mousedown(function(event){
					if( event.preventDefault ){   /// Prevent IMG DRAGGIN in firefox..
	                    event.preventDefault();
	                }
					that.hide();
			});

		////// Minimize BUTTON
			// console.log("Handling Minimize Button Events for widget: "+that.name);
			$(this.id+"_minimizeBTN").unbind("mouseenter mouseleave mousedown");
			///// Hover ON HOver Off -->  Close Button for That WIDGET..
			$(this.id+"_minimizeBTN").hover(function(event){
				that.hoveringMinimize = 1;
				$(this).css({
					cursor: "hand",
					cursor: "pointer",
				});
			}, function(event){
				$(this).css({
					cursor: "default",
				});
				that.hoveringMinimize = 0;
			});

			//// Clicking MINIMIZE Button for that Widget.
			$(this.id+"_minimizeBTN").mousedown(function(event){
					if( event.preventDefault ){   /// Prevent IMG DRAGGIN in firefox..
	                    event.preventDefault();
	                }
					that.minimizeWidget();
			});

		////// Maximize BUTTON
			// console.log("Handling Maximize Button Events for widget: "+that.name);
			$(this.id+"_maximizeBTN").unbind("mouseenter mouseleave mousedown");
			///// Hover ON HOver Off -->  
			$(this.id+"_maximizeBTN").hover(function(event){
				$(this).css({
					cursor: "hand",
					cursor: "pointer",
				});
				that.hoveringMaximize = 1;
			}, function(event){
				$(this).css({
					cursor: "default",
				});
				that.hoveringMaximize = 0;
			});

			//// Clicking Maximize Button for that Widget.
			$(this.id+"_maximizeBTN").mousedown(function(event){
					if( event.preventDefault ){   /// Prevent IMG DRAGGIN in firefox..
	                    event.preventDefault();
	                }
					that.maximizeWidget();
			});



		/// HOVERING HEADER BUT NOT HOVERING ANY OF THE BUTTONS..  --> Draggable Bug in Firefox might live here...
			// Unbind Header Events.
					$(this.id+"_header").unbind("mousemove mouseenter mouseleave mousedown dblclick");

				if( that.neverMovable !== true ){  //// ignore for neverMovable === true  condition..
						/// Starting Mouse Down Click of the header of the widget  -->  Starting a Move Of The Widget..
							$(this.id+"_header").mousedown(function(event){
										if(that.hoveringClose === 0 && that.hoveringMinimize === 0 && that.hoveringMaximize === 0){
											/// Start Moving Event..
												that.getClickPos_withinHeader(event.pageX);  /// Stores Where in the middle of Header you clicked,   OffSet from Left Side of Widget,  
											that.startedMove = 1;

											that.isDraggable = 1;
											
											////// Store starting Pos Before the move..
												that.returnFromMovePos = {left: that.left, top: that.top};
							                nowMovingWidget = that.id;   /// sets this widget to be the one user is moving and has in hand
							             
							             	/// If New Location is not set in timer --> send back to old position..
								                clearTimeout(movingWidgetTimer);
								                movingWidgetTimer = setTimeout(function(){
								                	 if(nowMovingWidget === that.id){
								                	 	/// Never got cleared on the mouseup event..
								                	 		// alert("Never Got Move Cleared..");
								                	 		that.move(that.returnFromMovePos.left,that.returnFromMovePos.top);
								                	 }
								                },6000);
								            
								            //// Turn On Draggable mode for this Widget..
												$(that.id).draggable('enable');
										}
							});

						//// Releasing Mouse Button  -- > POST MOVE dragging of widget..
								///// When Releasing mouseButton -->  while hovering the header of the widget.. --> post move Event..
									$(this.id+"_header").mouseup(function(event){
											that.isDraggable = 0;
												if(that.hoveringClose === 0 ||that.hoveringMinimize === 0 ||that.hoveringMaximize === 0){
													if(nowMovingWidget === that.id){  // Make Sure the Widget expected to 
														clearTimeout(movingWidgetTimer);
														// console.log("Releasing Mouse..");
														that.startedMove = 0;  /// Done Moving
														nowMovingWidget = null;
														
														var realLeftPos = (event.clientX - that.headerClick_leftOffset );
														that.left = realLeftPos;
														that.top = event.clientY-10;
														try{
															$(that.id).draggable('disable');
														}catch(exception){  }
															

														///// Check for Being Off Screen to Right
															that.handleWidgetResizing();
													}
												}
									});
			
						////  Update Cursor to Move Symbol When Hovering the Widget HEader..
							///// WIdget Header Hover on /  Hover Off
								$(this.id+"_header").hover(function(event){
										if( that.neverMovable === false ){
											if(that.hoveringClose === 0 ||that.hoveringMinimize === 0 ||that.hoveringMaximize === 0){
												$(this).css({
													cursor: "move",
												});
								                ////  Set nowMoving to this widget name
											}
										}
								}, function(event){
										$(this).css({
											cursor: "default",
										});
										try{
											$(that.id).draggable('disable');
											that.isDraggable = 0;
										}catch(exception){  }
								});
				}  /// End of checking to make sure neverMovable !== true
	};

///// Move Widget to new Location on Screen..
	//// Move WIdget to new x,y POS on screen
	Widget.prototype.move = function(left, top, zIndex){
		/// Move z-index option was passed to the move Func
		if(zIndex){
			console.log(">> Changing z-index for: "+this.name+" Widget");
			$(this.id).css("z-index", zIndex);
			this.zIndex = zIndex;
		}
		// Reposition
		// console.log(">> Moving "+this.name+" Widget");
		$(this.id).css({
			top: top,
			left: left,
		});
		this.top = top;
		this.left = left;
	};
	/// Don't Like the Animation Move,  people dont wait. 
	Widget.prototype.ani_move = function(left, top, callback){
		var that =
		// Reposition
		// console.log(">> Moving "+this.name+" Widget");
		$(this.id).stop().animate({
			top: top,
			left: left,
		}, 223, function(){
			that.top = top;
			that.left = left;
			if(callback){ callback(); }
		});
	};

	/////////////////////////////////////
	//// Jump to location on screen   
		/// Center of Screen..
			Widget.prototype.toCenterCenter = function() {
				var left =(  (window.innerWidth/2)- (this.width/2) )  ;
				var top = ( (window.innerHeight/2)-  (this.height/2)  );
				this.move( left,top);
			};	

		/// Bottom
			//// TO Bottom / Left Corner
				Widget.prototype.toBottomLeft = function(){
					this.move(   3,  (window.innerHeight-(this.height+12)));

				};
				Widget.prototype.toBottomCenter = function(){
					this.move(   (  (window.innerWidth/2)- (this.width/2) ),  (window.innerHeight-(this.height+12)));

				};
			//// TO Bottom / Right Corner
				Widget.prototype.toBottomRight = function(){
					this.move( (      window.innerWidth-(this.width+12)),  (window.innerHeight-(this.height+12)));
				};
		/// Top
			//// TO TOP / left Corner
				Widget.prototype.toTopLeft = function(){
					this.move(  3,  42    );
				};
				Widget.prototype.toTopCenter = function() {
					this.move( (  (window.innerWidth/2)- (this.width/2) ) , 42);
				};
				
			//// TO TOP / Right Corner
				Widget.prototype.toTopRight = function(){
					this.move( (      window.innerWidth-(this.width+12)),  42    );
				};



/// emulate clicking on widget,, and makes this widget on top of stack and in focus mode..
	Widget.prototype.assignFocused = function(){
		$(this.id).click();
	};


///////////   EVENTS //////////////////////////
///// Handle Events for This Widget
	Widget.prototype.extraHandleEvents = null;  /// called after normal widget handleEvents
	Widget.prototype.handleEvents = function(){
		var that=this;
		//// Is Header Showing?  Handle Close Button Clicks & Hover If is Showing..
			if(this.headerPOS === "top" || this.headerPOS === "bottom"){
				/// Setup Close Button Interface for THAT WIDGET
					this.setUpHeaderButtons();
			}

		/// When clicking on this widget -- > keep it at top above all other widgets..
			this.handleKeepingThisFocusWidgetTopZindex();

		if(this.extraHandleEvents !== null){
			this.extraHandleEvents();
		}

	};

	Widget.prototype.handleKeepingThisFocusWidgetTopZindex = function() {
		// var that = this;
		// ///// Bind click on this widget to update z-index to focus level.
		// //// If User Clicks anywhere on the widget
		// 	$(this.id).click(function(){
				
		// 		////  except for when hovering the close button --> (this.updateZindex() )
		// 			if(that.hoveringClose === 0){
		// 				// check for being wallpaper to ignore click... for doing anything with update log..
		// 					if(this.id !== "w_wallpaper"){

		// 						//// Store this focus Click
		// 							// console.log("----------------");
		// 							// console.log("Clicked Widget:"+that.id);
		// 							var currentFocusLogLength = widget_focus_log.length;
		// 							widget_focus_log.push(that);
		// 							//// Keep array a set length
		// 								if( currentFocusLogLength === widget_focus_log_desiredLength){
		// 									widget_focus_log.shift();
		// 									// swal("Shifting Widget Log array..");
		// 								}
		// 							// check for same 
		// 								if(widget_focus_log[currentFocusLogLength-1] == widget_focus_log[currentFocusLogLength] ){
		// 									// swal("already has focus");
		// 									widget_focus_log.pop();	
		// 								}else{
		// 									var newFocus = widget_focus_log[  widget_focus_log.length-1 ];
		// 									/// loop through log and list in order
		// 									for(var i=0; i<= widget_focus_log.length-1; i++){
		// 										// console.log( (i)+" "+widget_focus_log[i].id);
		// 									}	
		// 								}
		// 						//// update z Positions..
		// 								widget_focus_log[0].updateZindex(500);
		// 								try{
		// 									widget_focus_log[1].updateZindex(600);
		// 								}catch(arrayToSmall){  };
		// 								try{
		// 									widget_focus_log[2].updateZindex(900);	
		// 								}catch(arrayToSmall){  };
										
		// 					}
		// 			}else{
		// 				////  Clicked Close button for his widget... 
		// 			};
		// 	});

	};



//////////////////////////////////////////////////////////////////////
//////////////////////////  BUILD IT  ////////////////////////////
///// Build this Instance once all is defined.. .
	////  Add to DOM  -->  pass an Element with the # or . selector  and your widget will be added to that selector..
	Widget.prototype.add2DOM = function(element2_Add2){
		var that = this;
		$(element2_Add2).append( that.getHTML() );
	};

	Widget.prototype.extraSet_hasBeenRun = 0;   //// this is boolean to debounce  and make sure build() doesnt get run two times.. 
	Widget.prototype.build = function(){
			var that = this;   // i love .js  :)
			//// check for pre-processor..  before building hooks that might exist (  instance.preBuild() || instance.postBuild()  )
				if(this.preBuild !== null){
					//// has prebuild method needing to be run..
					this.preBuild();
				}

			// debounce --> build can only be run once per widget instance.. .
				this.extraSet_hasBeenRun = 1;   

			if(this.element2_append2 !== null){
				this.add2DOM( this.element2_append2 );
			}else{
		 		this.add2DOM("body");
				
			}
		 	/// Remove Highlighting for the Widget
		 	// tools.removeHighLighting('#w_'+this.name);

		 	/// Basic Style
		 		this.styleIt();  

		 	/// Handle Events 
		 		this.handleEvents();

		 	//// Show Correct Icons in the Header  , if there is one..
		 	//// Initialize Draggable Widget Draggable 
		 	////  check if header is shown --> show which icons  --> maybe hide some icons..
		 		if (this.headerPOS !== "off"){   /// so there is a header right?!!
		 			/// hide move icon?
			 			if(this.has_header_moveIcon === false){
			 					$("#w_"+this.name+"_moveBTN").hide();   ///  be better to actually remove them from the DOM maybe.. don't want it super bloated..
			 			}
		 			/// hide maximize icon
		 				if(this.has_header_maximizeIcon === false){
			 					$("#w_"+this.name+"_maximizeBTN").hide();
			 			}
		 			/// hide minimize icon
						if(this.has_header_maximizeIcon === false){
			 					$("#w_"+this.name+"_minimizeBTN").hide();
			 			}			 				
		 		}

		 	/// if Has a Title Bar Update Text and Icon Image Accordingly
		 		if(this.headerPOS !== "off"){
			 		/// Check for having headerIcon Image
			 			if( this.titleIcon !== undefined){
			 				var thisImageIcon = this.titleIcon;
			 			}else{
			 				var thisImageIcon = "_blank_";
			 			}
			 		/// Check if This Widget has a different title than it's name
				 		if(this.title !== undefined){
				 			this.updateTitle(this.title, thisImageIcon);
				 		}else{
				 			this.updateTitle(this.name, thisImageIcon);
				 		}
		 		}

		 		

		 	//// Hide Initially --> show initially is handled elseWhere..
		 		$(this.id).hide();

		 	/// Set Width / Height
		 		this.resize(this.width, this.height);    /// make sure DOM widget reflects size in width & height..
		 	
		 	// Move to Current Position
		 		this.move(this.left, this.top);

			 	//// Check if Background Transparent is on
	 			var that=this;
		 		if(that.isTransparent === true){
		 			setTimeout(function(){
		 				that.makeBG_transparent();
		 			},100);
		 		}

		 	///// some Widget After Being Built..  -->  Show Initially..
		 	///// Check if Showing this Widget Initally, After Good login sesh..
		 		if(this.showInitially == true){
		 			var that = this;
		 			setTimeout(function(){
		 				that.show();
		 			},120);
		 		}

		 	///// check if needing to hide closeIcon
		 		if(this.has_header_closeIcon === false || this.has_header_closeIcon === 0){
		 			$(this.id+"_closeBTN").hide();
		 		}

		 	//// Check here for the never moveable Flag
			 		if(this.neverMovable === false){
			 			$(this.id).draggable();
			 			$(this.id).draggable("disable");
			 		}

		 	/// Add Drop Shadow to Widget
		 		// $(this.id).addClass("dropShadow");
		 	//// Many Widgets seem to require unique postBuild Methods --> which get run here..
		 	//// check for postBuild Function
			 	if( this.postBuild !== null ){   	
			 			/// Run Post Build At Least.. .
		 					this.postBuild();      
			 	}
	};



//////////////////////////////
///// HIDE / SHOW Widgets
	/// Hide the Widgets
		Widget.prototype.actualHide = function(){   /// Check for potential hide_callback()s
			var that = this;
			that.isAnimating = 1;
			$(that.id).stop().animate({
				opacity: 0.6,
				height: this.height_down+ "px",
			}, that.transtionTime_hide, function() {
				that.isHidden = 1;
				that.isAnimating = 0;  /// done with animation..
				that.nowShowing = 0;
				$(that.id).hide();

				if(that.hide_callback !== null){
					that.hide_callback();
				}
			});
		};

		//// this is called and checks for potential pre-processor functions set on the instance..  if nothing needed to run before hiding it just hides --> actualHide();
		Widget.prototype.hide = function(){   /// Shrink  Conceil... 
			var that = this;
			if(that.hide_preProcess !== null){
				that.hide_preProcess(function(){
					that.actualHide();
				});
			}else{
				that.actualHide();
			}
		};

	/// Show the Widget
		Widget.prototype.actualShow = function(){
			var that = this;
			that.isAnimating = 1;
			$(that.id).show().stop().animate({
			    opacity: 1,
			    // width:  account.width+"px",
			    height: that.height + "px",

			}, that.transtionTime_show, function() {
				that.isHidden = 0;   // Widget is no longer hidden
			    that.isAnimating = 0;  /// done with show animation...  
			    that.nowShowing = 1;   ///  Widget is now Showing on Screen

			    if(that.show_callback !== null){
			    	that.show_callback();
			    }
			});
		};

		Widget.prototype.show = function(){
			var that = this;
			/// Check if this Widget has a pre Processor function before it can show..
				if(that.show_preProcess !== null){
					that.show_preProcess(function(){
						that.actualShow();
					});
				}else{
					that.actualShow();
				}
		};