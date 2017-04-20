'use strict';

var app = angular.module("TelHaiMaps", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "map.html",
    })
    .when("/login", {
        templateUrl : "login.html",
    });
});

app.directive('resizeRectangle', function(){
	return{
		restrict: 'E',
		templateUrl: 'resize-rectangle.html'

	};
});

app.directive('mapCanvas', function() {
    return {
        restrict: 'E',
        link: function(scope, element) {

			var map;
			var Israel;
			var rectangle;

			Israel = new google.maps.LatLng(31.768319, 35.21370999999999);

			map = new google.maps.Map(document.getElementById('map'), {
			center: Israel,
			zoom: 8
			});

			var bounds = {
			north: 31.78,
			south: 31.08,
			east: 35.12,
			west: 34.74
			};

			// Define the rectangle and set its editable property to true.
			rectangle = new google.maps.Rectangle({
				bounds: bounds,
				editable: true,
				draggable: true
			});

			rectangle.setMap(map);

			// Add an event listener on the rectangle.
			rectangle.addListener('bounds_changed', showNewRect);

            new google.maps.Map(element[0], mapOptions);

			function showNewRect(event) {

				var secondProjection = "+proj=tmerc +k_0=1.000006700000000 +lat_0=26.061528 +lon_0=33.011 +x_0=219529.584000000000000 +y_0=626907.389999999900000 +ellps=GRS80 +towgs84=24.0024,17.1032,17.8444,-0.33009,-1.85269,1.66969,-5.4248 +units=m +no_defs";
				/*var secondProjection = "+proj=cass +k_0=1 +lat_0=31.73408333 +lon_0=35.20944444 +x_0=170251.554999999900000 +y_0=1126867.909000000000000 +ellps=clrk66 +units=m +no_defs";
*/
			/*	var secondProjection = "+proj=merc +lat_0=90 +lon_0=0 +x_0=6300000 +y_0=6300000 +ellps=GRS80 +datum=WGS84 +units=m +no_defs";
	*/

				var aa = 56.35;
				var bb = 12.32;

				var a = 31.768319;
				var b = 35.21370999999999;
				var p = proj4(secondProjection,[a,b]);
				p[0] = p[0] + 50000;
				p[1] = p[1] + 500000;

            console.log(p);

				var ne = rectangle.getBounds().getNorthEast();
				var sw = rectangle.getBounds().getSouthWest();

				document.getElementById('north').value = ne.lat();
				document.getElementById('east').value = ne.lng();
				document.getElementById('south').value = sw.lat();
				document.getElementById('west').value = sw.lng();				 
			}


        }
    };
});


