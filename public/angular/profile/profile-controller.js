(() => {
  'use strict';
  const app = angular.module('todo');

  app.controller('profileCtrl', [
    'Profile',
    'Friend',
    'User',
    '$state',
    '$stateParams',
    'Auth',
    function(Profile, Friend, User, $state, $stateParams, Auth) {
      const vm = this;
      vm.users = [];
      vm.friends = [];
      vm.awaitingFriends = [];
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
        });
      };

      vm.fetchAwaitingFriends = () => {
        Friend.fetchAwaitingFriends().then(awaitingFriends => {
          vm.awaitingFriends = awaitingFriends;
        });
      };

      vm.makeResponse = (id, status) => {
        Friend.makeResponse(id, {status: status}).then(friend => {
          vm.fetchUsers();
          vm.fetchFriends();
          vm.fetchAwaitingFriends();
          $state.reload('user');
        });
      }

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
            .then(data => { vm.fetchUsers()})
            .catch(err => console.error(err));
        }
      };

      vm.fetchProfile();
      vm.fetchUsers();
      vm.fetchFriends();
      vm.fetchAwaitingFriends();
    }
  ]);
})();
