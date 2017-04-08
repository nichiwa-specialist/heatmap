$(document).ready(function() {

	var myLatlng = new google.maps.LatLng(41.0514, 141.2087);
	// map options,
	var myOptions = {
		zoom: 5,
//		zoom: 15,
		center: myLatlng
	};

	// standard map
	map = new google.maps.Map(document.getElementById("map"), myOptions);
	// heatmap layer
	heatmap = new HeatmapOverlay(map,
	{
		"radius": 30,
//		"radius": 50,
	    "maxOpacity": .7,
	    "scaleRadius": false,
	    "useLocalExtrema": false,
	    "latField": 'lat',
	    "lngField": 'lng',
	    "valueField": 'count'
	});

	$.get("json/list.json", function(list) {
		var count = 0;
		setInterval(function() {
			$.get(list[count], function(data) {
				// 日付取得
				var date = list[count].split("/")[1].split(".")[0];
				var ymdStr = date.substr(0,4) + "/";
				ymdStr += date.substr(4,2) + "/";
				ymdStr += date.substr(6,2) + "";

				// ヒートマップ反映
				heatmap.setData($.parseJSON(data));
				//			heatmap.setData(data);
				$("#date").text(ymdStr);

				count++;

				// ループさせる
				if (count >= list.length) {
					count = 0;
				}
			});
		}, 100);
	})
});
