var app = angular.module('mywebsite',['ngRoute']);

app.config(function($routeProvider){
	
	$routeProvider.
		when('/',{
			templateUrl : 'html/home.html'
		})
		.when('/general',{
			templateUrl : 'html/general/home.html'
		})
		.when('/technical',{
			templateUrl : 'html/technical/home.html'
		});
});

