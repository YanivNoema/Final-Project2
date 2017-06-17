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

app.controller('loginCntlr', ['$scope', '$http',function($scope,$http) {

	var users = ["dceee8c135c26d2c62d225981b8f4069", "de585d418dc56959d9e9aa3884240d86", "13f023972fefa5a77da9f6783153a6ca"];
	var temp = "0e233fbdec3b3bd4c5831077bc4d1063";
	$scope.passwordValueCorrect = false;
	$scope.password;
	$scope.userName;

	$scope.XTL;
	$scope.YTL;
	$scope.XBR;
	$scope.YBR;
	$scope.mapId;


	$scope.login = function(){

		if( users.indexOf(md5($scope.userName)) !== -1 ){
			if(temp === md5($scope.password))
				$scope.passwordValueCorrect = true;
			else $scope.passwordValueCorrect = false;
		}
	}

	$scope.insertNewMap = function(){

		var data =   {
	        "id": $scope.mapId.toString(),
	        "XTL": $scope.XTL.toString(),
	        "YTL": $scope.YTL.toString(),
	        "XBR": $scope.XBR.toString(),
	        "YBR": $scope.YBR.toString()
	      }


		$http.post("http://localhost:4000/maps", data).then(function(response){
			console.log("success");
		},function(response){
			console.log("error");
		});

		$scope.XTL = "";
		$scope.YTL = "";
		$scope.XBR = "";
		$scope.YBR = "";
		$scope.mapId = "";


	}


}]);

app.controller('mapCntlr', ['$scope', '$http', 'x2js',function($scope,$http,x2js,element) {

	$scope.itmX1Model = '';
	$scope.itmX2Model = '';
	$scope.itmY1Model = '';
	$scope.itmY2Model = '';
	$scope.wgsX1Model = '';
	$scope.wgsX2Model = '';
	$scope.wgsY1Model = '';
	$scope.wgsY2Model = '';

	$scope.nebaseCoordinates = "31.77 35.22";
	$scope.swbaseCoordinates = "31.98 34.85";
	$scope.filterMessage;
	$scope.data = [];
	$scope.searchResults = [];
	$scope.searchType = "contained";
	$scope.rectArr = [];

	var Israel;

	Israel = new google.maps.LatLng(31.77, 35.22);
	
	var map = new google.maps.Map(document.getElementById('map'), {
	center: Israel,
	zoom: 9,
	editable: true,
	draggable: true,
	panControl: false,
  	streetViewControl: false,
	});

	var bounds = {
		north: 31.77,
		south: 31.98,
		east: 35.22,
		west: 34.85
	};

	// Define the rectangle and set its editable property to true.
	$scope.rectangle = new google.maps.Rectangle({
		bounds: bounds,
		editable: true,
		draggable: true
	});

	$scope.rectangle.setMap(map);

	// Add an event listener on the rectangle.
	$scope.rectangle.addListener('bounds_changed', showNewRect);

	$scope.init = function(){

			$scope.filterMessage = "Some text for now";
			
			var ne = JSITM.gpsRef2itmRef("31.77 35.22");
			var sw = JSITM.gpsRef2itmRef("31.98 34.85");

			$scope.itmX1Model = parseFloat(ne.split(" ")[0]);
			$scope.itmY1Model = parseFloat(ne.split(" ")[1]);
			$scope.itmX2Model = parseFloat(sw.split(" ")[0]);
			$scope.itmY2Model = parseFloat(sw.split(" ")[1]);

			$scope.wgsY1Model = parseFloat($scope.nebaseCoordinates.split(" ")[0]);
			$scope.wgsX1Model = parseFloat($scope.nebaseCoordinates.split(" ")[1]);
			$scope.wgsY2Model = parseFloat($scope.swbaseCoordinates.split(" ")[0]);
			$scope.wgsX2Model = parseFloat($scope.swbaseCoordinates.split(" ")[1]);


            $http.get('maps.json').then(function(response) {
	    		$scope.data = response.data.maps;
			})
	}

	function showNewRect(event) {
	
		updateAllCoordiantes();
		/*window.setTimeout(updateAllCoordiantes, 0);*/
	}

	function updateAllCoordiantes(){

		var wgs1 = $scope.rectangle.getBounds().getNorthEast();
		var wgs2 = $scope.rectangle.getBounds().getSouthWest();

		var itm1 = JSITM.gpsRef2itmRef(wgs1.lat() + " " + wgs1.lng());
		var itm2 = JSITM.gpsRef2itmRef(wgs2.lat() + " " + wgs2.lng());

		var itmX1 = itm1.split(' ')[0];
		var itmY1 = itm1.split(' ')[1];
		var itmX2 = itm2.split(' ')[0];
		var itmY2 = itm2.split(' ')[1];

		var wgsY1 = wgs1.lng();
		var wgsX1 = wgs1.lat();
		var wgsY2 = wgs2.lng();
		var wgsX2 = wgs2.lat();
		
		document.getElementById('itmX1Id').value = parseFloat(itmX1);
		document.getElementById('itmY1Id').value = parseFloat(itmY1);
		document.getElementById('itmX2Id').value = parseFloat(itmX2);
		document.getElementById('itmY2Id').value = parseFloat(itmY2);

		document.getElementById('wgsY1Id').value = parseFloat(wgsY1);
		document.getElementById('wgsX1Id').value = parseFloat(wgsX1);
		document.getElementById('wgsY2Id').value = parseFloat(wgsY2);
		document.getElementById('wgsX2Id').value = parseFloat(wgsX2);
	}

	$scope.updateValues = function(source){
		
		$scope.cnt2++;

		if(source === 'itm'){
			
			var x1 = document.getElementById('itmX1Id').value;
			var y1 = document.getElementById('itmY1Id').value;
			var x2 = document.getElementById('itmX2Id').value;
			var y2 = document.getElementById('itmY2Id').value;

			var ne = JSITM.itmRef2gpsRef((Math.floor(x1)).toString() + (Math.floor(y1)).toString());
		  	var sw = JSITM.itmRef2gpsRef((Math.floor(x2)).toString() + (Math.floor(y2)).toString());

			var xx1  = ne.split(" ")[0];
			var yy1  = ne.split(" ")[1];
			var xx2  = sw.split(" ")[0];
			var yy2  = sw.split(" ")[1];


/*			$scope.wgsX1Model = xx1;
			$scope.wgsY1Model = yy1;
			$scope.wgsY2Model = xx2;
			$scope.wgsX2Model = yy2;
*/

			document.getElementById('wgsY1Id').value = parseFloat(yy1);
			document.getElementById('wgsX1Id').value = parseFloat(xx1);
			document.getElementById('wgsY2Id').value = parseFloat(yy2);
			document.getElementById('wgsX2Id').value = parseFloat(xx2);

		}else if(source === 'wgs'){

			var x1 = document.getElementById('wgsX1Id').value;
			var y1 = document.getElementById('wgsY1Id').value;
			var x2 = document.getElementById('wgsX2Id').value;
			var y2 = document.getElementById('wgsY2Id').value;

		  	var ne = JSITM.gpsRef2itmRef(x1 + " " + y1);
		  	var sw = JSITM.gpsRef2itmRef(x2 + " " + y2);

			var xx1 = ne.split(" ")[0];
			var yy1 = ne.split(" ")[1];
  			var xx2 = sw.split(" ")[0];
  			var yy2 = sw.split(" ")[1];
			
			
			document.getElementById('itmX1Id').value = parseFloat(xx1);
			document.getElementById('itmY1Id').value = parseFloat(yy1);
			document.getElementById('itmX2Id').value = parseFloat(xx2);
			document.getElementById('itmY2Id').value = parseFloat(yy2);
		}

		var wgs1 = $scope.rectangle.getBounds().getNorthEast();
		var wgs2 = $scope.rectangle.getBounds().getSouthWest();


		var east = parseFloat(document.getElementById('wgsX1Id').value);
		var north = parseFloat(document.getElementById('wgsY1Id').value);
		var west =	parseFloat(document.getElementById('wgsX2Id').value);
		var south = parseFloat(document.getElementById('wgsY2Id').value);
		
    	if (!isNaN(north) && !isNaN(south) && !isNaN(west) && !isNaN(east)) {
			var NE = new google.maps.LatLng(west, north);
			var SW = new google.maps.LatLng(east, south);
			var newRect = new google.maps.LatLngBounds(SW,NE);
			$scope.rectangle.setBounds(newRect);
/*			map.fitBounds(newRect);
*/		}
	}

	$scope.Search = function(){

		var curneitmx = document.getElementById('itmX1Id').value;
		var curneitmy = document.getElementById('itmY1Id').value;
		var curswitmx = document.getElementById('itmX2Id').value;
		var curswitmy = document.getElementById('itmY2Id').value;

		$scope.clearAll();

		if($scope.searchType === "contained"){
			$scope.data.forEach(function(item, index) {
				if(item.XTL < curneitmx && item.XTL > curswitmx
					&& item.YTL < curneitmy && item.YTL > curswitmy
					&& item.XBR > curswitmx && item.XBR < curneitmx
					&& item.YBR > curswitmy && item.YBR < curneitmy)
					$scope.searchResults.push(item);
			});
		}else if($scope.searchType === "contains"){
			$scope.data.forEach(function(item, index) {
				if(
					(item.XTL < curneitmx && item.XTL > curswitmx
					&& item.YTL < curneitmy && item.YTL > curswitmy)
					||(item.XTL < curneitmx && item.XTL > curswitmx
					&& item.YBR > curswitmy && item.YBR < curneitmy)
					||(item.XBR > curswitmx && item.XBR < curneitmx
					&& item.YTL > curswitmy && item.YTL < curneitmy)
					||(item.XBR > curswitmx && item.XBR < curneitmx
					&& item.YBR > curswitmy && item.YBR < curneitmy))
					$scope.searchResults.push(item);
			});
		}

		if($scope.searchResults.length > 0 )
			printRectangels($scope.searchResults);
	}


	function printRectangels(){

		var wgsx1;
		var wgsy1;
		var wgsx2;
		var wgsy2;


		$scope.searchResults.forEach(function(item, index) {
			
			var wgs1 = $scope.rectangle.getBounds().getNorthEast();
			var wgs2 = $scope.rectangle.getBounds().getSouthWest();

			wgsx1 = parseFloat(item.XTL);
			wgsx2 = parseFloat(item.XBR);
			wgsy1 = parseFloat(item.YTL);
			wgsy2 = parseFloat(item.YBR);


			var ne = JSITM.itmRef2gpsRef( (Math.floor(wgsx1)).toString() + (Math.floor(wgsy1)).toString());
		  	var sw = JSITM.itmRef2gpsRef((Math.floor(wgsx2)).toString() + (Math.floor(wgsy2)).toString());

			var yy2  = ne.split(" ")[0];
			var xx1  = ne.split(" ")[1];
			var yy1  = sw.split(" ")[0];
			var xx2  = sw.split(" ")[1];

			var bounds = {
				north: parseFloat(yy1),
				south: parseFloat(yy2),
				east: parseFloat(xx2),
				west: parseFloat(xx1)
			};

			$scope.rectArr[index] = new google.maps.Rectangle({
				strokeColor: '#00796B',
				strokeOpacity: 0.6,
				strokeWeight: 2,
				fillColor: '#00897b',
				fillOpacity: 0.25,
				map: map,
				bounds: bounds
			});

		});
	}

	$scope.openResults = function(){

		var stringParam = "";
		var SEP = "+OR+";
		var PART1 = "http://telhai-primo.hosted.exlibrisgroup.com/primo_library/libweb/action/search.do?fn=search&ct=search&initialSearch=true&mode=Basic&tab=default_tab&indx=1&dum=true&srt=rank&vid=972THI_V1&frbg=&tb=t&vl%28freeText0%29="
		var PART2 = "&scp.scps=scope%3A%28%22972THI%22%29&vl%28232124172UI1%29=maps&vl%281UI0%29=contains&vl%28221095693UI0%29=any&vl%28221095693UI0%29=title&vl%28221095693UI0%29=any"


		$scope.searchResults.forEach(function(item, index) {
			
			var temp = item.id;
			var len = temp.length;

			for(var i = 0; i < 9 - len; i++)
				temp = "0" + temp;

			if(index === $scope.searchResults.length)
				stringParam = stringParam + temp;
			else 	stringParam = stringParam + temp + SEP;
		})


		var URL = PART1 + stringParam + PART2;

		window.open(URL, '_blank');
	}

	$scope.clearAll = function(){
		$scope.searchResults = [];
	
		$scope.rectArr.forEach(function(item, index) {
		        item.setMap(null);
			});
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