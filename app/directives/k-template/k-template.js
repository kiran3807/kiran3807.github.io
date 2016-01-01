app.directive('kTemplate',['$complile','infScroll',function($compile,infScroll){
	
	var ddo = {};
	
	var templateFlagArr = [];
	ddo.scope = {
	
	};
	
	ddo.restrict = 'E';
	ddo.compile = function(element,attrs){
		element.replaceWith('<div></div>');
		
		var link = function(scope,element,attrs){
			
		}
	} 
}]);
