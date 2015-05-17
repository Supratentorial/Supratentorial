// Install the angularjs.TypeScript.DefinitelyTyped NuGet package to resolve the reference paths,
// then adjust the path value to be relative to this file
/// <reference path='../typings/angularjs/angular.d.ts'/>
// Create the module and define its dependencies.
var app1 = angular.module('app1', [
    // Angular modules 
    'ngResource',
    'ngAnimate',
    'ngRoute' // routing
]);
// Execute bootstrapping code and any dependencies.
app1.run(['$q', '$rootScope', function ($q, $rootScope) {
    }]);
//# sourceMappingURL=app1.js.map