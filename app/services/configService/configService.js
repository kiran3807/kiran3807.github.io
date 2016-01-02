app.factory('configService',['$http',function($http){

	var configService = {}; 
	configService.getConfig = function(){
	
		var configPromise = $http({
		method : 'GET',
		url : 'siteconfig'
	}).then(function(result){
		
		return{
			configObj : result
		};
	},
	function(errObj){
		return{
			message : 'could not retreive the config obj',
			status : errObj.status
		}
	});	
	
	return configPromise;
	
	}
	
	return configService ;

}]);
