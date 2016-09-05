(() => {
  'use strict';
  const app = angular.module('todo');

  app.controller('profileCtrl', [
    'Profile',
    'Friend',
    'User',
    '$state',
    '$stateParams',
    function(Profile, Friend, User, $state, $stateParams) {
      const vm = this;
      vm.users = [];
      vm.friends = [];
      vm.me = {};

      vm.fetchUsers = () => {
        User.fetchUsers().then(users => {
          vm.users = users;
        });
      };

      vm.fetchProfile = () => {
        Profile.fetchProfile().then(user => {
          vm.me = user;
        });
      };

      vm.fetchFriends = () => {
        Friend.fetchFriends().then(friends => {
          vm.friends = friends;
          console.log('friends: ', friends);
        });
      };

      // turn into service!
      vm.originalMe;
      vm.clicked;
      vm.toggleEdit = (bool) => {
        vm.clicked = !vm.clicked;

        if (bool === null) {
          vm.originalMe = Object.assign({}, vm.me);
        } else if (bool === false) {
          vm.me = vm.originalMe;
        } else {
          Profile.editProfile(vm.me)
            .catch(err => console.error(err));
        }
      };

      vm.fetchUsers();
      vm.fetchFriends();
      vm.fetchProfile();
    }
  ]);
})();
