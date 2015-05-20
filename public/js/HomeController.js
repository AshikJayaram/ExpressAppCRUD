angular.module('ExpressApp')
.controller('homeController',function($scope,$http,$filter){
  $scope.employees =[];
  var details = [];
  $scope.employees = details;
  $scope.Employee = {};
  $scope.EmployeeForm = '';
  $scope.ModifyEmployeeForm = '';
  $scope.today = $filter("date")(Date.now(), 'yyyy-MM-dd');
  //$scope.EmployeeForm = 'templates/Employee-Form.html';

  $scope.AddEmployee = function(employee){
    var employeeDetail = angular.copy(employee)
    $scope.employees.push(employeeDetail);
  };

  $scope.GetEmployeeDetails = function(){
    $scope.getEmployeeList().success(function(data,status){
      details = angular.copy(data);
      $scope.employees = details;
    })
    .error(function(data,status){})
  };

  $scope.ModifyEmployeeDetails = function(employee) {
    var self = this;
    $scope.PutDetails(employee).success(function(data) {
      console.log(data);
      $scope.GetEmployeeDetails();
      $scope.HideForm();
    });
  };

  $scope.PostEmployeeDetails = function(employee){
    var self = this;
    $scope.postDetails(employee).success(function(data){
      ///console.log(data);
      $scope.GetEmployeeDetails();
      self.HideForm();
    })
    .error(function(data){
      //console.log(data);
    })
  };

  $scope.deleteRecord = function (id) {
    //console.log(id);
    $scope.deleteEmployee(id).success(function(data){
      //console.log(data);
      $scope.GetEmployeeDetails();
    });
  };

  $scope.deleteEmployee = function (id) {
    return $http({
      method: 'DELETE',
      url: '/EmployeeList/' + id
    });
  };
  $scope.getEmployeeList = function () {
    return $http({
      method: 'GET',
      url: '/EmployeeList'
    });
  };

  $scope.postDetails = function(employee){
    return $http({
      method:'POST',
      url:'/EmployeeList',
      data: employee
    });
  };

  $scope.PutDetails = function (employee) {
    return $http({
      method:'PUT',
      url:'/EmployeeList',
      data: employee
    })
  };

  $scope.GetEmployeeDetails();

  $scope.HideForm = function () {
    $scope.EmployeeForm = '';
    $scope.ModifyEmployeeForm = '';
  };

  $scope.addnewEmployee = function() {
    $scope.EmployeeForm = 'templates/Employee-Form.html';
  };

  $scope.modifyRecord = function (employee) {
    $scope.ModifyEmployeeForm = 'templates/ModifyEmployeeDetails.html';
    $scope.Employee = employee;
  };

});
