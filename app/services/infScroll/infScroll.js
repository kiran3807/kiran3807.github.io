app.factory('infScroll',['$http',function($http){
	
	var infScroll = {};
	infScroll.getTemplate = function(templateUrl){
		
		var infScrollPromise = $http({
			method : 'GET',
			url : templateUrl,
			
		});
		return infScrollPromise;
	}
	return infScroll;

}]);

