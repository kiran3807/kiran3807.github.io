var app = angular.module('mywebsite',['ngRoute','custom-gist-embed']);

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
		})
		.when('/:category/:postId',{
		    templateUrl : function(params){
		        return '/html/'+params.category+'/posts/'+params.postId+'.html';
		    }
		});
});

