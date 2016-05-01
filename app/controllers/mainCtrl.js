app.controller('mainCtrl',['$scope',function($scope){

	$scope.message = "hello world";
	var kiran = function(){
		console.log("har har har");
	}
	
	$scope.dummy = { a :null , b: {heracles:null,hercules:null},c:{h:null,k:null},d:{ e:kiran,f:null,g:"http://facebook.com",h:{i:null,j:null} },kiran:"http://www.facebook.com" };
	
	$scope.topic = "dummyTopic1";

}])
