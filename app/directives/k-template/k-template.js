app.directive('kTemplate',['$compile','infScroll','$document','$window','configService',function($compile,infScroll,$document,$window,configService){
	
	var ddo = {};
	//both element and window are jquery elements
	var isEndVisible = function(element,window){
		var winTop = window.scrollTop(),
		winBottom = winTop + window.height(),
		elementTop = element.offset().top,
		elementBottom = elementTop + element.height();
		return elementTop > winTop && elementBottom < winBottom;
		
	}
	
	var afterConfigLoaded = function(configObj,scope,endDiv){
		
		var config = {};
		console.log(scope.topic);//debug
		if(configObj.hasOwnProperty(scope.topic)){
			config = configObj[scope.topic];
		}else{
			var msg = "<p>No topics to display</p>";
			endDiv.before(msg);
			return;
		}
		
		var infScrollSuccess = function(result){
			var template = result.data;
			var status = result.status;
			endDiv.before(result.data);
		}
	
		var infScrollFailure = function(errResponse){
			var errMsg = "<p>Could not load the post</p>";
			endDiv.before(errMsg);
		}
		
		scope.postIndex = config.numPosts;
		if(scope.postIndex < 1){
			var msg = "<p>No posts to display</p>";
			endDiv.before(msg);
			return;
		}
		if( isEndVisible(endDiv,angular.element($window)) ){
			var promise = infScroll.getTemplate(config.templatesLocation+scope.postIndex+".html");
				scope.postIndex--;
				promise.then(infScrollSuccess,infScrollFailure);
		}
		$document.on('scroll',function(){
			if(scope.postIndex < 1){
				return false;
			}
			if(isEndVisible(endDiv,angular.element($window) )){
				//the usage of sample is temporary replace sample with post
				var promise = infScroll.getTemplate(config.templatesLocation+scope.postIndex+".html");
				scope.postIndex--;
				promise.then(infScrollSuccess,infScrollFailure);
			}
		});
	}
	
	ddo.scope = {
		topic : '='
	};
	ddo.restrict = 'E';
	ddo.compile = function(element,attrs){
		element.replaceWith('<div id="posts"><hr id=\"end\"></hr></div>');
		element = $document.find('#posts');
		var endDiv = element.find("#end");
		var link = function(scope,element,attrs){
		
			configService.getConfig().then(function(result){
				afterConfigLoaded(result.data,scope,endDiv);
			},function(error){
				errMsg = "<p>Could not load site config. Please try again</p>";
				element.replaceWith(errMsg);
			});
		}
		return link;
	} 
	
	return ddo;
}]);
