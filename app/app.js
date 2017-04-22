'use strict';

/*DEFINE ANGULAR MODULE*/
var app = angular.module("TelHaiMaps", [
	'ngRoute',
    'ui.grid',
    'ui.grid.edit',
    'ui.grid.resizeColumns',
    'ui.grid.selection'
]);

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
        controller: 'mapCntlr',
        link: function(scope, element) {
		    new google.maps.Map(element[0], mapOptions);

        }
    };
});

app.controller('mapCntlr', ['$scope', function($scope,element) {

	$scope.itmx = '';
	$scope.itmy = '';
	$scope.wgsNE = '';
	$scope.wgsSW = '';
	$scope.baseCoordinates = "31.768319 35.21370999999999";

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

	function showNewRect(event) {

		var nelat = rectangle.getBounds().getNorthEast().lat();
		var nelng = rectangle.getBounds().getNorthEast().lng();
		var sw = rectangle.getBounds().getSouthWest();

		var curwgs =JSITM.gpsRef2itmRef(nelat + ' ' + nelng);
		$scope.itmx = curwgs.split(' ')[0];
		$scope.itmy = curwgs.split(' ')[1];
		$scope.wgsNE = ne;
		$scope.wgsSW = sw;				 
	}

	$scope.init = function(){
			var curwgs = JSITM.gpsRef2itmRef("31.768319 35.21370999999999");
		  	$scope.itmx = curwgs.split(" ")[0];
		  	$scope.itmy = curwgs.split(" ")[1];
		  	$scope.wgsNE = $scope.baseCoordinates.split(" ")[0];
			$scope.wgsSW = $scope.baseCoordinates.split(" ")[1];
	}

	$scope.updateValues = function(source){
		if(source === 'itm'){
			var curItm = JSITM.itmRef2gpsRef($scope.itmx + " " + $scope.itmy);
			$scope.wgsNE = curItm.split(" ")[0];
		  	$scope.wgsSW = curItm.split(" ")[1];

		}else if(source === 'wgs'){
		  	var curwgs = JSITM.gpsRef2itmRef($scope.wgsNE + " " + $scope.wgsSW);
		  	$scope.itmx = curwgs.split(" ")[0];
		  	$scope.itmy = curwgs.split(" ")[1];
		}
	}
	$scope.init();
}]);


