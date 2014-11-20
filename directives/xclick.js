'use strict';

angular.module('angular-xclick')
  .directive('xclick', function($compile, $parse){
    return {
      restrict: 'A',
      compile: function($element, attr) {
        var fn = $parse(attr.xclick);

        if( ! attr.hasOwnProperty('id') ){
          $element.attr('id', 'xclick-' + Date.now());
        }

        return function ngEventHandler(scope, element) {
          element.on('click', function(event){
            event.stopPropagation();

            if( element.attr('id') === event.target.id ){
              scope.$apply(function() {
                fn(scope, {$event:event});
              });
            }
          });
        };
      }
    };
});