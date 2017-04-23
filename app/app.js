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
/*app.directive('resizeRectangle', function(){
	return{
		restrict: 'E',
		templateUrl: 'resize-rectangle.html'

	};
});*/

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
	$scope.baseCoordinates = "31.77 35.22";

	var map;
	var Israel;
	var rectangle;

	Israel = new google.maps.LatLng(31.77, 35.22);

	map = new google.maps.Map(document.getElementById('map'), {
	center: Israel,
	zoom: 9
/*	editable: false,
	draggable: false,
	zoomControl: false,
	scrollwheel: false,
	disableDoubleClickZoom: false*/
	});

	var bounds = {
	north: 31.77,
	south: 31.98,
	east: 35.22,
	west: 34.85
	};

	// Define the rectangle and set its editable property to true.
	rectangle = new google.maps.Rectangle({
		bounds: bounds,
		editable: false,
		draggable: true
	});

	rectangle.setMap(map);

	// Add an event listener on the rectangle.
	rectangle.addListener('bounds_changed', showNewRect);

	$scope.init = function(){
			var curwgs = JSITM.gpsRef2itmRef("31.77 35.22");
		  	$scope.itmx = curwgs.split(" ")[0];
		  	$scope.itmy = curwgs.split(" ")[1];
		  	$scope.wgsNE = $scope.baseCoordinates.split(" ")[0];
			$scope.wgsSW = $scope.baseCoordinates.split(" ")[1];
	}

	function showNewRect(event) {
	
		updateAllCoordiantes();
	}

	function updateAllCoordiantes(){

		var ne = rectangle.getBounds().getNorthEast();
		var curwgs =JSITM.gpsRef2itmRef(ne.lat() + " " + ne.lng());
		
		var toITMx = curwgs.split(' ')[0];
		var toITMy = curwgs.split(' ')[1];
		var toWGSne = ne.lat();
		var toWGSsw = ne.lng();

		document.getElementById('itmxID').value = toITMx;
		document.getElementById('itmyID').value = toITMy;
		document.getElementById('wgsxID').value = toWGSne;
		document.getElementById('wgsyID').value = toWGSsw;
	}

	$scope.updateValues = function(source){
		if(source === 'itm'){
			
			var coord = JSITM.itmRef2gpsRef((Math.floor($scope.itmx)).toString() + (Math.floor($scope.itmy)).toString());
			var coordX  = coord.split(" ")[0];
			var coordY  = coord.split(" ")[1];
			$scope.wgsNE = coordX;
		  	$scope.wgsSW = coordY;

		}else if(source === 'wgs'){
		  	var curwgs = JSITM.gpsRef2itmRef($scope.wgsNE + " " + $scope.wgsSW);

		  	$scope.itmx = curwgs.split(" ")[0];
		  	$scope.itmy = curwgs.split(" ")[1];
		}

		var north =  parseFloat($scope.wgsNE);
		var south =  parseFloat(north - 0.21);

		var east =  parseFloat($scope.wgsSW);
		var west = parseFloat(east - 0.37);
    	

    	if (!isNaN(north) && !isNaN(south) && !isNaN(west) && !isNaN(east)) {
			var NE = new google.maps.LatLng(north, east);
			var SW = new google.maps.LatLng(south, west);
			var newRect = new google.maps.LatLngBounds(SW,NE);
			rectangle.setBounds(newRect);
			map.fitBounds(newRect);
		}
	}

	$scope.init();
}]);


app.directive('stringToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(value) {
        return '' + value;
      });
      ngModel.$formatters.push(function(value) {
        return parseFloat(value);
      });
    }
  };
});

app.run(function($rootScope) {
  $rootScope.typeOf = function(value) {
    return typeof value;
  };
})