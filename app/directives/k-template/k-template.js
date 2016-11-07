app.directive('kTemplate',['$compile','infScroll','$document','$window','configService','$rootScope','$q',function($compile,infScroll,$document,$window,configService,$rootScope,$q){
	
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
		if(configObj.hasOwnProperty(scope.topic)){
			config = configObj[scope.topic];
		}else{
			var msg = "<p>No topics to display</p>";
			endDiv.before(msg);
			return;
		}
		
		var infScrollSuccess = function(result){
			var template = result.data;
			var newScope = $rootScope.$new();
			var compiledTemplate = $compile(template)(newScope);
			var status = result.status;
			endDiv.before(compiledTemplate);
			$rootScope.$emit('kTemplateCompiled');
		}
	
		var infScrollFailure = function(errResponse){
			var errMsg = "<p>Could not load the post</p>";
			endDiv.before(errMsg);
		}
		
		var loadInitPosts = function(result) {
		    console.log("Recurse!");
		    infScrollSuccess(result);
	        if( isEndVisible(endDiv,angular.element($window)) ){
			    var promise = infScroll.getTemplate(config.templatesLocation+scope.postIndex+".html");
				scope.postIndex--;
				promise.then(loadInitPosts,infScrollFailure);
		    }else {
		        return
		    }
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
			promise.then(loadInitPosts,infScrollFailure);
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
		topic : '@'
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
