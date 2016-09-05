(() => {
  'use strict';
  const app = angular.module('todo');

  app.controller('userCtrl', [
    'Profile',
    'User',
    '$stateParams',
    function(Profile, User, $stateParams) {
      const vm = this;
      vm.id = $stateParams.id;

      vm.fetchUser = () => {
        User.fetchUser(vm.id).then(data => vm.user = data);
      };

      vm.fetchUser();

    }
  ]);
})();
