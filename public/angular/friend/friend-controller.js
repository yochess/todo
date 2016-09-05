(() => {
  'use strict';
  const app = angular.module('todo');

  app.controller('friendCtrl', [
    '$stateParams',
    function(Profile, $stateParams) {
      const vm = this;
      vm.id = $stateParams.id;

    }
  ]);
})();
