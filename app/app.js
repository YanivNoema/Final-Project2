'use strict';

// Declare app level module which depends on views, and components
angular.module('Tel-Hai-Maps', [
  'ngRoute',
  'Tel-Hai-Maps.view1',
  'Tel-Hai-Maps.view2',
  'Tel-Hai-Maps.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
