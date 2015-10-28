var tools = {};

////  Alert Clients GEO Location -- Longitude & Latitude..
tools.geoFindMe = function() {
  var geoLocation = document.getElementById("out");

  if (!navigator.geolocation){
    geoLocation.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    console.log( longitude+" : "+ latitude );
    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
    // console.log( img.src );
  };

  function error() {
    geoLocation.innerHTML = "Unable to retrieve your location";
  };

  // geoLocation.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
};

////  Black Transition Pre-Process..
tools.blackBodyBackground = function(){
	$('body').css("background", "#000");
};


///  Pass Selector, min font-size  / max font-size    Don't Define these values in SASS file..
tools.fitText = function(Selector, minFont, maxFont){
		var compression = 2.2;
		var minFontSize = minFont+"px";
		var maxFontSize = maxFont+"px";
		
		$(Selector).fitText(compression, { minFontSize: minFontSize, maxFontSize: maxFontSize });
};