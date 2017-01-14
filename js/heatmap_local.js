$(document).ready(function() {

	// don't forget to add gmaps-heatmap.js
	var myLatlng = new google.maps.LatLng(34.666104, 135.497401);
	// map options,
	var myOptions = {
		zoom: 15,
		center: myLatlng
	};
	// standard map
	map = new google.maps.Map(document.getElementById("map"), myOptions);
	// heatmap layer
	heatmap = new HeatmapOverlay(map, 
	{
		// radius should be small ONLY if scaleRadius is true (or small radius is intended)
		"radius": 50,
	    "maxOpacity": .7, 
	    // scales the radius based on map zoom
	    "scaleRadius": false, 
	    // if set to false the heatmap uses the global maximum for colorization
	    // if activated: uses the data maximum within the current map boundaries 
	    //   (there will always be a red spot with useLocalExtremas true)
	    "useLocalExtrema": false,
	    // which field name in your data represents the latitude - default "lat"
	    latField: 'lat',
	    // which field name in your data represents the longitude - default "lng"
	    lngField: 'lng',
	    // which field name in your data represents the data value - default "value"
	    valueField: 'count'
	});
	
	var list = ["json/20170113.json", "json/20170114.json"];
	var count = 0;
	setInterval(function() {
		$.get(list[count++], function(data){
			var json = $.parseJSON(data);
			// ヒートマップ反映
			heatmap.setData(json);
			// ループさせる
			if (count >= list.length) {
				count = 0;
			}
		});
	}, 2000);

});
