$(document).ready(function(){
	check4_goodSocketConnection();
});

////////////////////////////////
///  START UP THIS CLIENT ..
	var initApp = function(){
			/// Handle Custom Resize Event handlers.. 
				resizer.init();

			//  Remove all Hidden for Mobile Items if In Mobile mode..
				removeHideOnMobileItems();

			
			// tools.fitText(".education_itemTitle", 10, 32);

				handleClickingThumbnails();
			/// 
				mobile_multiTouch.init();

			// show facebook like button ??? 
				desideIfShowingFB_button();

			// Grab GITHUB API info.. and update DOM..
				github.updateAccountInfo();
			
			/// Init Tool Tips for Hover.. 
				$(function () {
				 	 $('[data-toggle="tooltip"]').tooltip()
				});

			////  AJAX  the NAVIGATION...  
				partials.handleAJAX_loading();

			////  make a widget instance.. 

				/////###################========-----
				////  Accordian Widget..
					// avatar = new Accordion("accordion", "top");
					// 	avatar.showInitially = true;
					// 	// avatar.showInitially = false;
						
					// 	avatar.width = 200;
					// 	avatar.height = 20;
					// 	avatar.build();



	};
	var check4_goodSocketConnection = function(){
		if(socket){
			initApp();
		}else{
			setTimeout(function(){
				check4_goodSocketConnection();
			},200);
		}
	};
	var removeHideOnMobileItems = function(){
		if(window.innerWidth <=820){
			$(".hideOnMobile").hide();
		}
	};
///////////////////////////////


//////////////////////////////////
/// Easy AJAX loading of pages...
	var loadPage = {
		everything : function(){
			var pPath = "everything";
			partials.updateScroller(pPath, function(){
					console.log("DONE Loading : "+pPath+" Partial");
			});
		},
		techSkills : function(){
			var pPath = "techSkills";
			partials.updateScroller(pPath, function(){
					console.log("DONE Loading : "+pPath+" Partial");
			});
		},
		workExp : function(){
			var pPath = "workExp";
			partials.updateScroller(pPath, function(){
					console.log("DONE Loading : "+pPath+" Partial");
			});
		},
		education : function(){
			var pPath = "education";
			partials.updateScroller(pPath,function(){
				github.updateAccountInfo();
				console.log("DONE Loading : "+pPath+" Partial");
			});
		},
		github : function(){
			var pPath = "github";
			partials.updateScroller(pPath,function(){
				github.updateAccountInfo();
				console.log("DONE Loading : "+pPath+" Partial");
			});
		},
		tutorials : function(){
			var pPath = "youtubeTuts";
			partials.updateScroller(pPath,function(){
				github.updateAccountInfo();
				console.log("DONE Loading : "+pPath+" Partial");
			});
		},
	};

///////////////////////////
	var removeIframes = function(){
		var iframes = document.getElementsByTagName('iframe');
		for (var i = 0; i < iframes.length; i++) {
		    iframes[i].parentNode.removeChild(iframes[i]);
		}
	};

////////////////////////////////////
///  Partials  Handling  
	var partials = {
		/// Empty / Hide Partials
			emptyDebounce : null,
			empty : function(callbackPostEmpty){
				/// Does have post Empty Callback? 
					if(callbackPostEmpty){ 
						partials.fadeOut( callbackPostEmpty );
					}
			},
			fadeOut : function(callbackPostFadeOut){
				// if has youtube VIDEO ?? 
					removeIframes();
				$(".partialView_Wrapper").animate({opacity: 0}, 222,function(){
					clearTimeout(partials.emptyDebounce);
					partials.emptyDebounce = setTimeout(function(){
						$("#lucentBodyScroller").html("");
						$(".partialView_Wrapper").remove();

						// console.log("scroller emptied..");
						if(callbackPostFadeOut){   
							callbackPostFadeOut();
						}
					},133);
				});
			},
			fadeIn : function(callbackPostFadeIn){
					// $('.partialView_Wrapper').trigger("create");
					removeHideOnMobileItems();
					if(callbackPostFadeIn){
						$(".partialView_Wrapper").stop().animate({opacity: 1}, 222, callbackPostFadeIn);
					}
			},


		/// Fetch a partial
			fetch : function(partialName, callback_withPartialHTML){
				if(!callback_withPartialHTML){
					alert("No callback passed partials.fetch function..");
				}else{
					var thatcallback_withPartialHTML = callback_withPartialHTML;
					$.ajax({
					    type: "GET",
					    url: "/partials/"+partialName,
					    dataType: "html",
					    success: function(data){
					    	thatcallback_withPartialHTML(data);
					    }
					}); 
				}
			},

		///  Fill Scroller
			updateScroller : function(partialName, callback){			
				var scopeCallback = callback;
				partials.pushHistoryItem({info: "Hire Brent Linhardt"}, "Hire Brent Linhardt!","/" + partialName );   //// 
				partials.fadeOut(function(){
					var thatCallback = callback || scopeCallback;
					partials.fetch(partialName, function(data){ 
						console.log("Updating Scroll Content.");
						$("#lucentBodyScroller").html(data);

						partials.fadeIn(thatCallback);
					});
				});
			},

		///// TURN OFF NEW GET REQUEST,  load Partials via AJAX rather.. . 
			handleAJAX_loading : function(){
					//// Turn Off Navigation Default a tags..  use $.ajax rather.. for partial views
						$(".naviAjaxItem a").click(function(event){
								event.preventDefault();
								var link = $(this).attr("href");
									if( link.indexOf("/") !== -1){
										link = (link.split("/") )[1];
										console.log("Clicked : "+link);
										//// check for which navigatoin load AJAXy.. 
											if(link === 'everything'){
												loadPage.everything();
												setTimeout(function(){
													github.updateAccountInfo();
												},1000);
											}else if(link === 'github'){
												loadPage.github();
											}else {
												var runFunction = loadPage[link];
												runFunction();
											}
											$('.tooltip').not(this).fadeOut();
									}else{
										alert("LINK is not on this Domain suspect..");
									}
						});

			},
		//// Push AJAX load to history for backbutton.. 
			pushHistoryItem : function(stateObj, pageTitle, url){
				///  var stateObj = { foo: "bar" };
				history.pushState(stateObj, pageTitle, url);
			},
	};


//////////////
////  Text2Voice
	var t2s = {
		speak : function(msg){
			if( t2s.checkIfSpeaking() ){  // Currently  Speaking Please wait to finish..
				// var thisMSG = msg;
				// clearTimeout(t2s.debounceForSpeak);
				// t2s.debounceForSpeak = setTimeout(function(){
				// 	t2s.speak(thisMSG);
				// },1000);
			}else{
				/// Run Speak Command
					responsiveVoice.speak(msg);
			}
		},
		checkIfSpeaking : function(){
			return window.speechSynthesis.speaking;
		},
		debounceForSpeak : null,
		queue :[],
	};

///// Mobile TouchScreen NameSpace..
	var mobile_multiTouch = {
		//// Handlers  
		swipe_LeftHandler  : function( event ){
			// $( event.target ).addClass( "swipeleft" );
			var speakMSG_text  = ("Swipe Left : will walk through Mobile Views");
			t2s.speak(speakMSG_text);
		},
		swipe_RightHandler : function( event ){
			// $( event.target ).addClass( "swiperight" );
			var speakMSG_text  = ("Swipe Right : will walk through Mobile Views");
			t2s.speak(speakMSG_text);
		},


		/// Constructor..
		init : function(){
			var myTouchElement = document.getElementById("lucentBodyScroller");
			var mc = new Hammer(myTouchElement);
				mc.get("swipe").set({ direction: Hammer.DIRECTION_ALL });
				mc.on("swipe", function(event){
					// alert(typeof event.direction);
					if(event.direction === 2){
						mobile_multiTouch.swipe_LeftHandler(event);
					}else if(event.direction === 4){
						mobile_multiTouch.swipe_RightHandler(event);
					}
				});
		},
	};

///////////////////////////////
//// GIT HUB  CONTROLLER.. 
	var github = {
		updateAccountInfo : function(){
			try{
				$.get("https://api.github.com/users/adeptpro", function(data){
						var gh_user = {
							loginName : data.login,
							avatarIMG_url :data.avatar_url,
							userName : data.name,
							comapny  : data.company,
							blog     : data.blog,
							location : data.location,
							repoCount : data.public_repos,
							followersCount : data.followers,
							followingCount : data.following,
						 };
						 
						 //// UPDATE DOM
						 	$(".gitHub_Account_info_account").html(gh_user.loginName );
						 	$(".gitHub_Account_info_name").html(gh_user.userName );
						 	$(".gitHub_Account_info_company").html(gh_user.comapny );
						 	$(".gitHub_Account_info_pubRepoCount").html(gh_user.repoCount );
						 	$(".gitHub_Account_info_followers").html(gh_user.followersCount );
						 	// img
						 	$(".githubProfileImg").attr("src", gh_user.avatarIMG_url);
							//$(".githubProfileImg").css({width : "127px", height: "auto"});
							
							// fade in GITHUB wrapper

								$(".githubProfile_wrapper").stop().show().animate({opacity:1}, 300);

						console.log( gh_user );
					
				});
			}catch(exception){
				console.log("FAILED TO FETCH FROM GITHUB API..");
			}
		},
	};

///////  Dev Skills Controller..
	var devSkills = {};


//////////////////////////////////
//// BOOTSTRAP MODAL  UPDATING>..
	var show_DevSkill_ModalDebouncer = null;
	var updateDevSkill_modalIMG = function(thisFromJqueryClick){
		/// get alt value from button clicks as well as button contents
			var that = thisFromJqueryClick;
			var extraText = (that.attributes.valueOf()[0]).value ;
			/// check for having img path in this string.. 
			console.log(extraText.indexOf("^^^") );
				if(extraText.indexOf("^^^") === -1){
					console.log(extraText);
					$("#modalDevSkills_imageContainer img").attr("src", "img/SkillsIMG/_Blank.png");
					$("#modalDevSkillFooterWrapper").html(extraText);
				}else{
					////  Has Path Of extra Image before that Seperating Char.
					console.log("Parsing ImgPath From String");	
					$("#modalDevSkills_imageContainer img").show();
					var extraImgPath = extraText.split("^^^") ;
						var extraText = extraImgPath[1];
						var extraImgPath = extraImgPath[0];
						console.log(extraImgPath);
						console.log(extraText);
					/// HTML with IMG and the text both..
						$("#modalDevSkills_imageContainer img").attr("src",extraImgPath);
						$("#modalDevSkillFooterWrapper").html(extraText);
					
				}	
				
					var btnPressed = ($(that).html());
					console.log(btnPressed);

			$("#DevSkills_Modal .modal-header").html(btnPressed);
			clearTimeout(show_DevSkill_ModalDebouncer);
			show_DevSkill_ModalDebouncer = setTimeout(function(){
				$('#DevSkills_Modal').modal({
			        show: 'true'
			    });
			}, 50);
	};

///////////////////////////////////
///////  Set Div to FullScreen
	var setDiv_Fullscreen = function(selectorID){  /// do not include # char in string..
		var elem = document.getElementById(selectorID);
		if (elem.requestFullscreen) {
		  elem.requestFullscreen();
		} else if (elem.msRequestFullscreen) {
		  elem.msRequestFullscreen();
		} else if (elem.mozRequestFullScreen) {
		  elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullscreen) {
		  elem.webkitRequestFullscreen();
		}
	};

//////////////////////////////
/////   Bootstap Modals... 
	var clickingDevSkill_animationDebouncer = null;
	var show_lrgModalDebouncer = null;

	var updateLRG_modalIMG = function(newIMGPath){
		$("#modalLRG_imageContainer img").attr("src",newIMGPath); 
		clearTimeout(show_lrgModalDebouncer);
		show_lrgModalDebouncer = setTimeout(function(){
			$('#largeImage').modal({
		        show: 'true'
		    });
		}, 50);
	};

	var handleClickingThumbnails = function(){
		setTimeout(function(){
			tools.blackBodyBackground();
			
			
			$(".imageThumb img").unbind("click");
			$(".imageThumb img").click(function(event){
				console.log("Clicked Image: ");
				var imgSRC = this.src;
					imgSRC = ( imgSRC.split("/img/")[1] );

				var smlImgPath = imgSRC;
					imgSRC = imgSRC.split("/");
				var lrgImgPath = "https://s3-us-west-1.amazonaws.com/adeptpro/Resume/"+"img/"+imgSRC[0]+"/lrg/"+imgSRC[1];
				// Fill Modal with Right Large Image..
					updateLRG_modalIMG(lrgImgPath);
			});
		},1000);
	};


/////////////////////////////
//////  SHOW FACEBOOK LIKE BUTTON?? 
	var desideIfShowingFB_button = function(){
		var windowWidth = window.innerWidth;
		if(windowWidth <= 360){
			$("#facebookBtn_wrapper").hide();
		}else{
			if( $("#facebookBtn_wrapper").css("visibility") === "hidden"){
				$("#facebookBtn_wrapper").show();
			}
		}
	};


///////////////////////////////
/////  RESIZE HANDLER..
	var resizeDebouncer = null;

	var resizer = {
		init : function(){
			resizer.update_lucentBodyScroller_withContactInfo();

			console.log("Handling Reactive Design..");
			setTimeout(function(){
				/// Handle all window resize events..
				$(window).resize(function(event){
						resizer.update_lucentBody();
						resizer.update_lucentBodyScroller();		
				});	
			}, 100);
		},
		colapseNavigation : function(){

		},
		showContactInfo : function(){
			$("#contactInfo").show().stop().animate({top: "19px", opacity:1}, 230,function(){
				// done showing.. contact info..
			});
		},
		hideContactInfo : function(){
			$("#contactInfo").stop().animate({top: "7px", opacity : 0 }, 230, function(){
					var that = this;
					setTimeout(function(){
						$(that).css({top:"10px"}).hide();
					},322);
			});
		},
		get_lucentBodyHeight : function(){
			console.log("Updating DOM - Post Resize Event");
			/// header size
				var hSize = $("#lucentHeader").height();
			/// body Size
				var bSize = $("#lucentBody").height();
			/// window size
				var wSize = window.innerHeight;
			/// footer size
				var fSize = $("#lucentFooter").height();

			/// New Body Height
				var new_bheight = (wSize - fSize);

			return new_bheight;
		},
		update_lucentBody : function(){
			var hSize = $("#lucentHeader").height();
			var newHeight = resizer.get_lucentBodyHeight();
			$("#lucentBody").animate(  { height:newHeight+"px", top: hSize+"px"}   , 555);
		},
		update_lucentBodyScroller : function(){
			var newHeight = resizer.get_lucentBodyHeight();
			var newScrollHeight = newHeight - 33;
			$("#lucentBodyScroller").animate({height : newScrollHeight }, 230);
		},
		update_lucentBodyScroller_withContactInfo : function(){
			var newHeight = resizer.get_lucentBodyHeight();
			var newScrollHeight = newHeight - 33;
			$("#lucentBodyScroller").animate({top : "100px", height : newScrollHeight }, 230);
		},
	};



