app.factory('configService',['$http',function($http){

	var configService = {}; 
	configService.getConfig = function(){
	
		var configPromise = $http({
		method : 'GET',
		url : '/siteconfig.json'
	});
	
		return configPromise;
	}
	return configService ;

}]);
