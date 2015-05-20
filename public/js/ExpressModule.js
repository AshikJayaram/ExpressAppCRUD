angular.module('ExpressApp',[])
.controller('IndexController',function($scope){
  $scope.AppName = "Hello world";
  $scope.Homepage = 'templates/Home-page.html';
});
