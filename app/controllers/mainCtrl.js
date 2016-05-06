app.controller('mainCtrl',['$scope','$location',function($scope,$location){

	var hyperlinks = {
		general :"general",
		technical :"technical",
		home : "/"
	}
	
	var openGeneral = function(){
		$location.url(hyperlinks.general);
	}
	
	var openTechnical = function(){
		$location.url(hyperlinks.technical);
	}
	
	var openHomePage = function(){
		$location.url(hyperlinks.home);
	}
	
	var foo = function(){
		console.log('foo');
	}
	
	var bar = function(){
		console.log('bar');
	}
	/*
	 * The reason sideMenu object is at the last ,is that if we put it before any
	 * of the function declarations above, instead of throwing errors it will simply
	 * accept the function name as function declarations are hoisted. However undefined will
	 * be passed to the k-sidebar directive as function definitions are not hoisted
	 */
	$scope.sideMenu = { general : openGeneral , technical : openTechnical, home : openHomePage ,k:foo,i :{ l:bar}};
}]);
