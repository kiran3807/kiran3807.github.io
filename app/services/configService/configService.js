app.factory('configService',['$http',function($http){

	var configService = {}; 
	configService.getConfig = function(){
	
		var configPromise = $http({
		method : 'GET',
		url : 'siteconfig.json' // change to /siteConfig later on
	});
	
		return configPromise;
	}
	return configService ;

}]);

//TODO change siteConfig.js value for numPosts to 0 once done testing on the local
