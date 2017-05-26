'use strict';

/*DEFINE ANGULAR MODULE*/
var app = angular.module("TelHaiMaps", [
    'ngAnimate',
    'ui.bootstrap',
	'ngRoute',
    'ui.grid',
    'ui.grid.edit',
    'ui.grid.resizeColumns',
    'ui.grid.selection',
    'cb.x2js'
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



app.controller('mapCntlr', ['$scope','$http', 'x2js', 'mapFilterService',function($scope, $http, x2js, element, mapFilterService) {


	var a = mapFilterService;

	$scope.itmx = '';
	$scope.itmy = '';
	$scope.wgsNE = '';
	$scope.wgsSW = '';
	$scope.baseCoordinates = "31.77 35.22";
	$scope.baseCoordinates2 = "31.98 34.85";
	$scope.data = [];

	var map;
	var Israel;
	var rectangle;

	Israel = new google.maps.LatLng(31.77, 35.22);

	map = new google.maps.Map(document.getElementById('map'), {
	center: Israel,
	zoom: 9,
	editable: true,
	draggable: true
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
		editable: true,
		draggable: true
	});

	rectangle.setMap(map);

	// Add an event listener on the rectangle.
	rectangle.addListener('bounds_changed', showNewRect);

	$scope.init = function(){
			
			var curwgs1 = JSITM.gpsRef2itmRef("31.77 35.22");
			var curwgs2 = JSITM.gpsRef2itmRef("31.98 34.85");

/*
			document.getElementById('itmxID1').value = curwgs1.split(" ")[0];
			document.getElementById('itmyID1').value = curwgs1.split(" ")[1];
			document.getElementById('itmxID2').value = curwgs2.split(" ")[0];
			document.getElementById('itmyID2').value = curwgs2.split(" ")[1];
		
			document.getElementById('wgsxID1').value = $scope.baseCoordinates.split(" ")[0];
			document.getElementById('wgsyID1').value = $scope.baseCoordinates.split(" ")[1];
			document.getElementById('wgsxID2').value = $scope.baseCoordinates2.split(" ")[0];
			document.getElementById('wgsyID2').value = $scope.baseCoordinates2.split(" ")[1];

*/
	/*	  	$scope.itmx1 = curwgs1.split(" ")[0];
		  	$scope.itmy1 = curwgs1.split(" ")[1];
		  	$scope.itmx2 = curwgs2.split(" ")[0];
		  	$scope.itmy2 = curwgs2.split(" ")[1];
		  	
		  	$scope.wgsX1 = $scope.baseCoordinates.split(" ")[0];
			$scope.wgsY1 = $scope.baseCoordinates.split(" ")[1];
		  	$scope.wgsX2 = $scope.baseCoordinates.split(" ")[0];
		  	$scope.wgsY2 = $scope.baseCoordinates.split(" ")[1];
*/
            $http.get('maps.xml').then(function(response) {
	            var mapsDef = x2js.xml_str2json(response.data);
	            $scope.mapsObj = mapsDef.maps.mapInfo;
	            var mapCount = $scope.mapsObj.length;
	            for (var i = 0; i < mapCount; i++) {
	                $scope.data.push({
	                    sysNum: $scope.mapsObj[i].sysNum,
	                    XTL: $scope.mapsObj[i].XTL,
	                    YTL: $scope.mapsObj[i].YTL,
	                    XBR: $scope.mapsObj[i].XBR,
	                    YBR: $scope.mapsObj[i].YBR
	                });
	            }
	            if($scope.data.length !== 0)
	            	mapFilterService.setList($scope.data);
	        });

	}

	function showNewRect(event) {
	
		updateAllCoordiantes();
	}

	function updateAllCoordiantes(){

		var ne = rectangle.getBounds().getNorthEast();
		var sw = rectangle.getBounds().getSouthWest();
		var curwgsNE =JSITM.gpsRef2itmRef(ne.lat() + " " + ne.lng());
		var curwgsWS =JSITM.gpsRef2itmRef(sw.lat() + " " + sw.lng());
		
		var toITMx1 = curwgsNE.split(' ')[0];
		var toITMy1 = curwgsNE.split(' ')[1];
		var toITMx2 = curwgsWS.split(' ')[0];
		var toITMy2 = curwgsWS.split(' ')[1];

		var toWGSne1 = ne.lat();
		var toWGSne2 = ne.lng();
		var toWGSsw1 = sw.lat();
		var toWGSsw2 = sw.lng();

		document.getElementById('itmxID1').value = toITMx1;
		document.getElementById('itmyID1').value = toITMy1;
		document.getElementById('itmxID2').value = toITMx2;
		document.getElementById('itmyID2').value = toITMy2;
	
		document.getElementById('wgsxID1').value = toWGSne1;
		document.getElementById('wgsyID1').value = toWGSne2;
		document.getElementById('wgsxID2').value = toWGSsw1;
		document.getElementById('wgsyID2').value = toWGSsw2;
	
	}

	$scope.updateValues = function(source){
		if(source === 'itm'){
			
			var coordNe = JSITM.itmRef2gpsRef((Math.floor($scope.itmx1)).toString() + (Math.floor($scope.itmy1)).toString());
			var coordSw = JSITM.itmRef2gpsRef((Math.floor($scope.itmx2)).toString() + (Math.floor($scope.itmy2)).toString());
			
			var coordX1  = coordNe.split(" ")[0];
			var coordY1  = coordNe.split(" ")[1];
			var coordX2  = coordSw.split(" ")[0];
			var coordY2  = coordSw.split(" ")[1];

			$scope.wgsX1 = coordX1;
		  	$scope.wgsY1 = coordY1;
			$scope.wgsX2 = coordX2;
			$scope.wgsY2 = coordY2;

		}else if(source === 'wgs'){

		  	var curwgNe = JSITM.gpsRef2itmRef($scope.wgsX1 + " " + $scope.wgsY1);
		  	var curwgWs = JSITM.gpsRef2itmRef($scope.wgsX2 + " " + $scope.wgsY2);

		  	$scope.itmx1 = curwgNe.split(" ")[0];
		  	$scope.itmy1 = curwgNe.split(" ")[1];
		  	$scope.itmy2 = curwgWs.split(" ")[1];
		  	$scope.itmy2 = curwgWs.split(" ")[1];
		
		}

		var north =  parseFloat($scope.wgsX1);
		var south =  parseFloat($scope.wgsY1);

		var east =  parseFloat($scope.wgsX2);
		var west = parseFloat($scope.wgsY2);
    	

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