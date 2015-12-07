app.directive('kSidebar',function(){

	var render = function(element,obj,display){
					
		var parent = angular.element("<ul></ul>");
		var template,templateString;
			for (var key in obj){
					
				if(typeof obj[key] === null){
							
							templateString = "<li>"+key+"</li>";
							template = angular.element(templateString);
				}
				else if(typeof obj[key] === "string"){
							
							templateString = "<li><a href=\""+obj[key]+"\">"+key+"</a></li>";
							template = angular.element(templateString);
				}
				else if(typeof obj[key] === "object"){
						
						templateString = "<li>"+key+"</li>";
						template = angular.element(templateString);
						render(template,obj[key],false);
				}
				parent.append(template);
			}
			element.append(parent);
		};
		
	var ddo = {};
	ddo.restrict = 'E';
	var scope= {
		options : '=options',
		size : '=size',
		color : '=color'
	}
	ddo.scope=scope;
	ddo.compile = function(element,attrs){
		var elm = angular.element('<div></div>');
		element.replaceWith(elm);
			
		var link = function(scope,element,attrs){
			render(element,scope.options,true);
		}
		return link;
	
	};
	return ddo;

	/*return{
		restrict : 'E',
		scope : 
			{ 
				options : '=options',
				size : '=size',
				color : '=color'
			},
		compile : function(element,attrs){
			var elm = angular.element('<div></div>');
			element.replaceWith(elm);
			
			var link = function(scope,element,attrs){
			}
			return link;
		}
	};*/
})
