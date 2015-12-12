app.directive('kSidebar',function(){

	var render = function(element,obj,isSubmenu){
					
		var parent = angular.element("<ul></ul>");
		
		if(!isSubmenu && typeof obj === "object"){
			parent = angular.element("<ul class=\"sidebar-nav\"></ul>");
		}
		else if(typeof obj === "object"){
			parent = angular.element("<ul class=\"sub-nav\"></ul>");
		}
			
		var template,templateString,submenuTemplate,submenuTemplateString;
			for (var key in obj){
					
				if( obj[key] === null){
							
							templateString = "<li>"+key+"</li>";
							template = angular.element(templateString);
				}
				else if(typeof obj[key] === "string"){
							
							templateString = "<li><a href=\""+obj[key]+"\">"+key+"</a></li>";
							template = angular.element(templateString);
				}
				else if(typeof obj[key] === "object"){
				
						templateString = "<li>"+key+"</li>";
						submenuTemplateString = "<div class=\"sub-wrapper\">"+"</div>";
						submenuTemplate = angular.element(submenuTemplateString);
						template = angular.element(templateString);
					
						render(submenuTemplate,obj[key],true);
						template.append(submenuTemplate);
						
						template.on("mouseenter",function(){
							angular.element(this).children(".sub-wrapper").css("visibility","visible");
						});
						template.on("mouseleave",function(){
							angular.element(this).children(".sub-wrapper").css("visibility","hidden");
						});
						
				}
				parent.append(template);
			}
			element.append(parent);
		};
	
	var setInitPosition = function(element){
		var submenus = element.children(".sidebar-nav").children("li").children("div");
		console.log(submenus);
		var width = element.css("width");
		submenus.css("left",width);
	}
		
	var ddo = {};
	ddo.restrict = 'E';
	var scope= {
		options : '=options',
		size : '=size',
		color : '=color'
	}
	ddo.scope=scope;
	ddo.compile = function(element,attrs){
		var elm = angular.element('<div class="sidebar-wrapper"></div>');
		element.replaceWith(elm);
			
		var link = function(scope,element,attrs){
			render(element,scope.options,false);
			setInitPosition(element);
		}
		return link;
	
	};
	return ddo;

})
