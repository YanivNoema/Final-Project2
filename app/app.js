'use strict';

// Declare app level module which depends on views, and components

var app = angular.module("TelHaiMaps", []);

app.directive('resizeRectangle', function(){
	return{
		restrict: 'E',
		templateUrl: 'resize-rectangle.html'

	};
});