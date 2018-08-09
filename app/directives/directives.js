/**
 * An AngularJS directive for Dropzone.js, http://www.dropzonejs.com/
 * 
 * Usage:
 * 
 * <div ng-app="app" ng-controller="SomeCtrl">
 *   <button dropzone="dropzoneConfig">
 *     Drag and drop files here or click to upload
 *   </button>
 * </div>
 */

myrvApp.directive('myrvdatepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
         link: function (scope, element, attrs, ngModelCtrl) {
            $(element).datepicker({
                dateFormat: 'mm/dd/yy',
                onSelect: function (date) {
                    scope.date = date;
                    scope.$apply();
                }
            });
        }
    };
});
angular.module('dropzone', []).directive('dropzone', function () {
  return function (scope, element, attrs) {
    var config, dropzone;

    config = scope[attrs.dropzone];

    // create a Dropzone for the element with the given options
    dropzone = new Dropzone(element[0], config.options);

    // bind the given event handlers
    angular.forEach(config.eventHandlers, function (handler, event) {
      dropzone.on(event, handler);
    });
  };
});

myrvApp.directive('stateListDisplay', function () {
    return {
        restrict: 'E',
        scope: {
            nameid: '@'
        },
        templateUrl: 'app/directives/templates/statelistdisplay.html',
        replace: true,
        transclude: false,
        link: function (scope, elements, attrs, controllers) { 
            var nameid = attrs.nameid;
            
        }
    }

});

myrvApp.directive('yesNoListDisplay', function () {
    return {
        restrict: 'E',
        scope: {
            nameid: '@',
            prefix: '@',
            yesnoList: '=yesnolist'
        },
        templateUrl: 'app/directives/templates/yesnolistdisplay.html',
        replace: true,
        transclude: false,
        link: function (scope, elements, attrs, controllers) { 
            var i = 0;
        }
    }
});

myrvApp.directive('statusListDisplay', function () {
    return {
        restrict: 'E',
        scope: {
            nameid: '@',
            prefix: '@'
        },
        templateUrl: 'app/directives/templates/statuslistdisplay.html',
        replace: true,
        transclude: false,
        link: function (scope, elements, attrs, controllers) { 
            var nameid = attrs.nameid;
            var prefix = attrs.prefix;
        }
    }
});

myrvApp.directive('phoneNumberDisplay', function () {
    return {
        restrict: 'E',
        scope: {
            nameid: '@',
            classname: '@'
        },
        template: "<input class='{{classname}}' style='width:170px;' type='text' id='{{nameid}}' name='{{nameid}}'  placeholder='Enter your phone number' required>",
        replace: true,
        transclude: false,
        link: function (scope, elements, attrs, controllers) { 
            // var nameid = "#"+attrs.nameid;

            elements.bind("keydown keypress", function(e) {
                if (e.keyCode == 8 || e.keyCode == 46)
                {
                    return false;
                }

                if (e.keyCode < 47 || e.keyCode > 57)
                {
                    e.preventDefault();

                    return false;
                }

                var test = this.value;
                if (test.length == 2 || test.length == 6)
                {
                    this.value = test + String.fromCharCode(e.keyCode) + "-";
                    e.preventDefault();

                    return false;
                }
            });
            
        }
    }
});