( function(){

    var app = angular.module('custom-gist-embed',[]);
    app.directive('kGistEmbed',[function(){
        var ddo = {};
        
        ddo.scope = {};
        ddo.restrict = "A";
        
        ddo.compile = function(element,attrs){
            return function(){
                
                if( typeof element.gist === "function" ){
                    element.gist();
                }
            }
        }
        return ddo;
    }]);
    
    app.service('gistEmbed', ['$document', '$q', '$timeout', function($document, $q, $timeout) {
    
            // taken from  https://github.com/pasupulaphani/angular-gist-embed

            var libUrl = 'https://cdnjs.cloudflare.com/ajax/libs/gist-embed/2.4/gist-embed.min.js';

            var loadSdkAsync = function(src) {
                var deferred = $q.defer();
                var script = $document[0].createElement('script');
                script.onload = script.onreadystatechange = function(e) {
                    $timeout(function() {
                        deferred.resolve(e);
                    });
                };
                script.onerror = function(e) {
                    $timeout(function() {
                        deferred.reject(e);
                    });
                };
                script.src = src;
                $document[0].body.appendChild(script);
                return deferred.promise;
            };

            this.init = function() {
                return loadSdkAsync(libUrl);
            };
        }]);
    app.run(['gistEmbed',function(gistEmbed){
        gistEmbed.init();
    }]);
})();

