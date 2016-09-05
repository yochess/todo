(() => {
  'use strict';
  const app = angular.module('todo');

  app.controller('profileCtrl', [
    'Profile',
    '$state',
    '$stateParams',
    function(Profile, $state, $stateParams) {
      const vm = this;
      vm.users = [];
      vm.friends = [];
      vm.me;

      vm.fetchUsers = () => {
        Profile.fetchUsers().then(users => {
          vm.users = users;
        });
      };

      vm.fetchFriends = () => {
        Profile.fetchFriends().then(friends => {
          vm.friends = friends;
          console.log(friends);
        });
      };

      vm.fetchMe = () => {
        Profile.fetchMe().then(user => {
          vm.me = user;
        });
      };

      vm.fetchUsers();
      vm.fetchFriends();
      vm.fetchMe();
    }
  ]);
})();
