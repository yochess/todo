(() => {
  'use strict';
  const app = angular.module('todo');

  app.controller('navbarCtrl', [
    'Auth',
    function(Auth) {
      const vm = this;
      vm.loggedIn = Auth.isAuthSync();

      vm.checkAuth = () => {
        console.log(Auth.isAuthSync());
      }

      vm.checkAuthAsync = () => {
        Auth.isAuthAsync().then(data => console.log(data))
          .catch(err => console.log(err));
      };
    }
  ]);
})();
