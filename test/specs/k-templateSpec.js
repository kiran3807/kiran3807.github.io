describe('initial loading specs for k-template directive',function(){

	beforeEach(module('mywebsite'));
	beforeEach(inject(function($rootScope,$compile,$window,$document,$httpBackend,infScroll,configService){
		this.windowService = angular.element($window);
		this.documentService = $document;
		this.httpService = $httpBackend;
		this.scope = $rootScope.$new();
		var element = angular.element("<k-template></k-template>");
		var body = this.documentService.find('body').append(element);
		
		this.httpService.when('GET','/siteconfig.json').respond({"numPosts" : 2,"templatesLocation" : "/html/templates/"});
		this.httpService.when('GET','/html/templates/2.html').respond("<div style=\"height:1000px\" id=\"2\">Random-Text-2</div>");
		
		var link = $compile(body);
		this.template = link(this.scope);
		$rootScope.$digest();
	}));
	
	it('is the end divider visible at the start',function(){
		var docTop = this.windowService.scrollTop();
		var docBottom = docTop + this.windowService.height();
		var endDividerTop = this.template.find('#end').offset().top;
		var endDividerBottom = endDividerTop + this.template.find('#end').height();
		
		expect(this.template.find('#end').length).toBeGreaterThan(0);
		expect(endDividerTop).toBeLessThan(docBottom);
		expect(endDividerBottom).toBeGreaterThan(docTop);
		
	});
	
	it('the directive is replaced by a div with id \'posts\' and should contain the end divider',function(){
		expect(this.template.get(0)).not.toEqual('<k-template></k-template>');
		expect(this.template.find('#posts').length).toBeGreaterThan(0);
		expect(this.template.find('#posts').find('#end').length).toBeGreaterThan(0);
	});
	
	it('first post is loaded and displayed in DOM when end divider is visible at the start',function(){
		this.httpService.flush();
		this.httpService.expectGET('/html/templates/2.html');
		expect(this.template.find('#posts').find('#2').length).toBeGreaterThan(0);
	
	});
	
	describe('post loading specs for k-template directive',function(){
		
			beforeEach(inject(function(){
				this.httpService.when('GET','/html/templates/1.html').respond("<div id=\"1\" style=\"height:1000px\">Random-Text-1</div>");
				this.httpService.flush();
			
			}));
			
			it('the next post is loaded when end divider is visible after scrolling down',function(){
		
			var docHeight = this.documentService.height();
			this.documentService.scrollTop(docHeight);
		
			var windowTop = this.windowService.scrollTop();
			var windowBottom = windowTop + this.windowService.height();
			var endDivOffset = this.template.find('#end').offset().top;
		
			expect(endDivOffset).toBeGreaterThan(windowTop);
			expect(endDivOffset).toBeLessThan(windowBottom);
			this.documentService.trigger('scroll');
			this.httpService.flush();
			/* the digest is just present for the sake of completeness. its not needed as of now */
			this.scope.$digest();
			
			this.httpService.expectGET('/html/templates/1.html');
			expect(this.template.find('#posts').find('#2').length).toBeGreaterThan(0);
			expect(this.template.find('#posts').find('#1').length).toBeGreaterThan(0);
			expect(this.template.find('#posts').find('#1').index()).toBeGreaterThan(this.template.find('#posts').find('#2').index());
		
	});
		});
	
});

