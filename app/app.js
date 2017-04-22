'use strict';

/*DEFINE ANGULAR MODULE*/
var app = angular.module("TelHaiMaps", ["ngRoute"]);

/*ROUTING*/
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "map.html",
    })
    .when("/login", {
        templateUrl : "login.html",
    });
});


/*DIRECTIVES*/
app.directive('resizeRectangle', function(){
	return{
		restrict: 'E',
		templateUrl: 'resize-rectangle.html'

	};
});

app.directive('navMenu', function(){
	return{
		restrict: 'E',
		templateUrl: 'nav-menu.html'

	};
});

app.directive('navFooter', function(){
	return{
		restrict: 'E',
		templateUrl: 'nav-footer.html'

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

				// var ISRAEL_TM_PROJ = 

				var secondProjection = "+proj=tmerc +lat_0=31.73439 +lon_0=35.20452 +k=1.0000067 +x_0=219,529.584 +y_0=626,907.390 +ellps=GRS80 +datum=GRS80	 +units=m +no_defs";
				/*var secondProjection = "+proj=cass +k_0=1 +lat_0=31.73408333 +lon_0=35.20944444 +x_0=170251.554999999900000 +y_0=1126867.909000000000000 +ellps=clrk66 +units=m +no_defs";
*/
			/*	var secondProjection = "+proj=merc +lat_0=90 +lon_0=0 +x_0=6300000 +y_0=6300000 +ellps=GRS80 +datum=WGS84 +units=m +no_defs";
	*/

				var aa = 56.35;
				var bb = 12.32;

				var lat = 31.768319;
				var lng = 35.21370999999999;

				var p = proj4(secondProjection,[lat,lng]);
				
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


