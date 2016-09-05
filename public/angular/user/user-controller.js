(() => {
  'use strict';
  const app = angular.module('todo');

  app.controller('userCtrl', [
    'Profile',
    'User',
    'Friend',
    '$stateParams',
    '$state',
    'Auth',
    function(Profile, User, Friend, $stateParams, $state, Auth) {
      const vm = this;
      vm.id = $stateParams.id;
      vm.friend;
      vm.checkMe = {};
      vm.checkMe.a = +$stateParams.id;

      vm.fetchUser = () => {
        User.fetchUser(vm.id).then(data => vm.user = data);
      };

      vm.checkFriend = () => {
        Friend.checkFriend(vm.id).then(data => vm.friend = data);
      };

      vm.makeRequest = () => {
        Friend.makeRequest(vm.id).then(data => { $state.reload() });
      };

      vm.getUser = () => {
        Auth.getUser().then(me => { vm.checkMe.b = +me.user });
      };

      vm.fetchUser();
      vm.checkFriend();
      vm.getUser();
    }
  ]);
})();
