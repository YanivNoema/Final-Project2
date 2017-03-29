'use strict';

// Declare app level module which depends on views, and components

var app = angular.module("TelHaiMaps", [
	'ngMap'
]);

app.controller('test', function(rectangle) {

	rectangle.addListener('bounds_changed', showNewRect);

	function showNewRect(event) {
		var ne = rectangle.getBounds().getNorthEast();
		var sw = rectangle.getBounds().getSouthWest();
	}




});