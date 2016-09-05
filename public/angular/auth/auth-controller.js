(() => {
  'use strict';
  const app = angular.module('todo');

  app.controller('authCtrl', [
    '$state',
    'Auth',
    function($state, Auth) {
      const vm = this;

      vm.user = {};

      vm.login = () => {
        Auth.login(vm.user).then(data => {
          $state.go('profile', {}, {reload: true});
        });
      };

      vm.signup = () => {
        Auth.signup(vm.user).then(data => {
          $state.go('profile', {}, {reload: true});
        });
      }
    }
  ]);
})();
