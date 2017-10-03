/**
 * Created by Home on 9/25/2017.
 */
var app = angular.module("myApp", ['ngRoute'])
app.config(function ($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix("");
	//$routeProvider.otherwise({redirectTo: 'login'})
	/*$routeProvider.when('',)*/
	$routeProvider.when('/login', {
		templateUrl: "./views/login-form.html",
		controller: "login-ctrl"
	})
})