(() => {
  'use strict';
  const app = angular.module('todo');

  app.directive('navbar', [
    function() {
      return {
        templateUrl: './navbar/navbar.html',
        controller: 'navbarCtrl',
        controllerAs: 'vm'
      };
    }
  ]);
})();
